"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    FileText,
    Calendar,
    Activity,
    ArrowUpRight,
    Heart,
    Download,
    CheckCircle2
} from "lucide-react";
import { MOCK_PATIENTS, MOCK_RECORDS } from "@/services/mockData";
import { recordService } from "@/services/recordService";
import { useEffect, useState } from "react";
import { MedicalRecord } from "@/types";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const { user } = useAuth();
    const [myRecords, setMyRecords] = useState<MedicalRecord[]>([]);
    const [showSystemStatus, setShowSystemStatus] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const isDoctor = user?.role === "DOCTOR";
    const isPatient = user?.role === "PATIENT";

    useEffect(() => {
        if (isPatient && user?.id) {
            recordService.getRecordsByPatientId(user.id).then(setMyRecords);
        }
    }, [user, isPatient]);

    const stats = isDoctor
        ? {
            totalPatients: MOCK_PATIENTS.length,
            medicalRecords: MOCK_RECORDS.length,
            appointments: 12,
            activePrescriptions: 7
        }
        : {
            totalPatients: 0,
            medicalRecords: myRecords.length,
            appointments: 2,
            activePrescriptions: myRecords.filter(r => r.status === "Active").length
        };

    const handleDownloadReport = () => {
        setDownloading(true);
        setTimeout(() => {
            const reportData = {
                generatedAt: new Date().toISOString(),
                user: user?.name,
                stats: stats,
                summary: isDoctor
                    ? `Total Patients: ${stats.totalPatients}, Records: ${stats.medicalRecords}, Appointments: ${stats.appointments}`
                    : `My Records: ${stats.medicalRecords}, Appointments: ${stats.appointments}, Active Prescriptions: ${stats.activePrescriptions}`
            };

            const blob = new Blob([JSON.stringify(reportData, null, 2)], {
                type: "application/json"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `health-report-${new Date()
                .toISOString()
                .split("T")[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setDownloading(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* ===== DASHBOARD HEADER ===== */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Welcome back, {user?.name || "User"}. Here's what's happening today.
                    </p>
                </div>

                {isDoctor && (
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="bg-white/50 backdrop-blur-sm"
                            onClick={handleDownloadReport}
                            disabled={downloading}
                        >
                            {downloading ? (
                                <>
                                    <Download className="mr-2 h-4 w-4 animate-bounce" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </>
                            )}
                        </Button>

                        <Button
                            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                            onClick={() => setShowSystemStatus(true)}
                        >
                            <Activity className="mr-2 h-4 w-4" />
                            System Status
                        </Button>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {isDoctor && (
                    <Card className="bg-white/80 backdrop-blur-xl shadow-lg border-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Total Patients
                            </CardTitle>
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Users className="h-4 w-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {stats.totalPatients}
                            </div>
                            <p className="text-xs text-green-600 flex items-center mt-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                +2 from last month
                            </p>
                        </CardContent>
                    </Card>
                )}

                {isPatient && (
                    <Card className="bg-white/80 backdrop-blur-xl shadow-lg border-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                Health Score
                            </CardTitle>
                            <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                                <Heart className="h-4 w-4 text-pink-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">Good</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Based on recent checkups
                            </p>
                        </CardContent>
                    </Card>
                )}

                <Card className="bg-white/80 backdrop-blur-xl shadow-lg border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            {isDoctor ? "Medical Records" : "My Records"}
                        </CardTitle>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-indigo-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {stats.medicalRecords}
                        </div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            {isDoctor ? "+1 new this week" : "All time records"}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-xl shadow-lg border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Appointments
                        </CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-orange-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {stats.appointments}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {isDoctor ? "Today's schedule" : "Upcoming visits"}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-xl shadow-lg border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Active Prescriptions
                        </CardTitle>
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Activity className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {stats.activePrescriptions}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Currently active
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* System Status Modal */}
            {showSystemStatus && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowSystemStatus(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                System Status
                            </h2>
                            <button
                                onClick={() => setShowSystemStatus(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            {["Database", "API Server", "Authentication"].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        <div>
                                            <p className="font-medium text-gray-900">{item}</p>
                                            <p className="text-sm text-gray-500">Operational</p>
                                        </div>
                                    </div>
                                    <span className="text-green-600 font-semibold">
                                        100%
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Button
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                            onClick={() => setShowSystemStatus(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
