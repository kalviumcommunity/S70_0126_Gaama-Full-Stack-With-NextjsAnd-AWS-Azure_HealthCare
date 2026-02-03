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
            activePrescriptions: myRecords.filter(
                r => r.status === "Active"
            ).length
        };

    const handleDownloadReport = () => {
        setDownloading(true);
        setTimeout(() => {
            const reportData = {
                generatedAt: new Date().toISOString(),
                user: user?.name,
                stats,
                summary: isDoctor
                    ? `Total Patients: ${stats.totalPatients}, Records: ${stats.medicalRecords}, Appointments: ${stats.appointments}`
                    : `My Records: ${stats.medicalRecords}, Appointments: ${stats.appointments}, Active Prescriptions: ${stats.activePrescriptions}`
            };

            const blob = new Blob(
                [JSON.stringify(reportData, null, 2)],
                { type: "application/json" }
            );
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

    const cardClass =
        "bg-white/80 backdrop-blur-xl shadow-lg border-none hover:shadow-xl transition-shadow";

    return (
        <div className="flex flex-col gap-8">
            {/* ===== SYSTEM STATUS MODAL ===== */}
            {showSystemStatus && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowSystemStatus(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-1">
                            System Status
                        </h2>

                        {/* ✅ UPDATED TEXT (NO UI IMPACT) */}
                        <p className="text-sm text-gray-500 mb-4">
                            All services are currently operational and running smoothly.
                        </p>

                        <div className="space-y-3">
                            {["Database", "API Server", "Authentication"].map(item => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        <span className="font-medium">{item}</span>
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
// All system services are operational and stable.
