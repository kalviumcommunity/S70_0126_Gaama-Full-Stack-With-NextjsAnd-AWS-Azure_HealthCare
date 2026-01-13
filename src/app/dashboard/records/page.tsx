"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { recordService } from "@/services/recordService";
import { MedicalRecord, Patient } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: MedicalRecord['status'] }) {
    const colors = {
        Active: "bg-yellow-100 text-yellow-800",
        Resolved: "bg-green-100 text-green-800",
        Chronic: "bg-red-100 text-red-800"
    };
    return (
        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", colors[status])}>
            {status}
        </span>
    );
}

export default function MyRecordsPage() {
    const { user } = useAuth();
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            if (user) {
                try {
                    // If user is doctor, this page might not be relevant or show all. But per requirements "My Records" is for Patients.
                    const data = await recordService.getRecordsByPatientId(user.id);
                    setRecords(data);
                } catch (error) {
                    console.error("Failed to fetch records", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchRecords();
    }, [user]);

    if (isLoading) return <div>Loading records...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">My Medical Records</h1>
            <div className="space-y-4">
                {records.map(record => (
                    <Card key={record.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <CardTitle className="text-lg">{record.diagnosis}</CardTitle>
                                        <StatusBadge status={record.status} />
                                    </div>
                                    <CardDescription>{record.date} • Treated by Dr. {record.doctorName}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <span className="font-semibold text-sm">Symptoms: </span>
                                <span className="text-gray-600 text-sm">{record.symptoms.join(", ")}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-sm">Prescription: </span>
                                <p className="text-gray-600 text-sm mt-1 bg-gray-50 p-2 rounded">{record.prescription}</p>
                            </div>
                            {record.notes && (
                                <div>
                                    <span className="font-semibold text-sm">Doctor's Notes: </span>
                                    <p className="text-gray-600 text-sm italic">{record.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
                {records.length === 0 && (
                    <p className="text-muted-foreground">You have no medical records yet.</p>
                )}
            </div>
        </div>
    );
}
