"use client";
// id
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { patientService } from "@/services/patientService";
import { recordService } from "@/services/recordService";
import { Patient, MedicalRecord } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Inline Badge component for now to save time/complexity
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

export default function PatientDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const [patient, setPatient] = useState<Patient | null>(null);
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientData, recordsData] = await Promise.all([
                    patientService.getPatientById(id),
                    recordService.getRecordsByPatientId(id)
                ]);
                if (patientData) setPatient(patientData);
                setRecords(recordsData);
            } catch (error) {
                console.error("Error fetching patient details", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    if (isLoading) return <div>Loading patient details...</div>;
    if (!patient) return <div>Patient not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/patients">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Patient Details</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Patient Info Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader className="text-center">
                            <img
                                src={patient.avatar}
                                alt={patient.name}
                                className="h-24 w-24 rounded-full mx-auto mb-2"
                            />
                            <CardTitle>{patient.name}</CardTitle>
                            <CardDescription>{patient.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div>
                                <span className="font-semibold text-gray-500">Date of Birth:</span>
                                <p>{patient.dateOfBirth}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-500">Gender:</span>
                                <p>{patient.gender}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-500">Blood Type:</span>
                                <p>{patient.bloodType}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-500">Phone:</span>
                                <p>{patient.phone}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-500">Address:</span>
                                <p>{patient.address}</p>
                            </div>
                            <div className="pt-4 border-t">
                                <span className="font-semibold text-gray-500 block mb-1">Emergency Contact</span>
                                <p className="font-medium">{patient.emergencyContact.name}</p>
                                <p className="text-gray-500">{patient.emergencyContact.relation} • {patient.emergencyContact.phone}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Medical History */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Medical History</h2>
                        <Link href={`/dashboard/records/new?patientId=${patient.id}`}>
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Record
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {records.map(record => (
                            <Card key={record.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <CardTitle className="text-base">{record.diagnosis}</CardTitle>
                                                <StatusBadge status={record.status} />
                                            </div>
                                            <CardDescription>{record.date} • Dr. {record.doctorName}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-semibold">Symptoms: </span>
                                        <span className="text-gray-600">{record.symptoms.join(", ")}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Prescription: </span>
                                        <span className="text-gray-600">{record.prescription}</span>
                                    </div>
                                    {record.notes && (
                                        <div className="bg-gray-50 p-2 rounded text-gray-700 italic border">
                                            "{record.notes}"
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                        {records.length === 0 && (
                            <div className="text-center py-10 border-2 border-dashed rounded-lg bg-gray-50">
                                <p className="text-gray-500">No medical records found for this patient.</p>
                                <Link href={`/dashboard/records/new?patientId=${patient.id}`}>
                                    <Button variant="link">Create First Record</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
