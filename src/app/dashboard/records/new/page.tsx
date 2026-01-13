"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { recordService } from "@/services/recordService";
import { MOCK_PATIENTS } from "@/services/mockData";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const recordSchema = z.object({
    patientId: z.string().min(1, "Patient is required"),
    diagnosis: z.string().min(2, "Diagnosis is required"),
    symptoms: z.string(), // We'll split by comma
    prescription: z.string().min(2, "Prescription is required"),
    notes: z.string().optional(),
    status: z.enum(["Active", "Resolved", "Chronic"]),
});

type RecordFormValues = z.infer<typeof recordSchema>;

function RecordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedPatientId = searchParams.get("patientId");
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<RecordFormValues>({
        resolver: zodResolver(recordSchema),
        defaultValues: {
            patientId: preselectedPatientId || "",
            status: "Active",
            symptoms: "",
            notes: ""
        }
    });

    const onSubmit = async (data: RecordFormValues) => {
        if (!user) return;
        setIsSubmitting(true);
        try {
            await recordService.createRecord({
                ...data,
                doctorId: user.id,
                doctorName: user.name,
                date: new Date().toISOString().split('T')[0],
                symptoms: data.symptoms.split(',').map(s => s.trim()).filter(s => s !== ""),
                notes: data.notes || ""
            });
            router.push(preselectedPatientId ? `/dashboard/patients/${preselectedPatientId}` : "/dashboard");
        } catch (error) {
            console.error("Failed to create record", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Medical Record</CardTitle>
                <CardDescription>Create a new medical entry for a patient.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="patientId">Patient</Label>
                        <select
                            {...form.register("patientId")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm border-gray-300"
                            disabled={!!preselectedPatientId}
                        >
                            <option value="">Select a patient</option>
                            {MOCK_PATIENTS.map(p => (
                                <option key={p.id} value={p.id}>{p.name} ({p.email})</option>
                            ))}
                        </select>
                        {form.formState.errors.patientId && (
                            <p className="text-sm text-red-500">{form.formState.errors.patientId.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="diagnosis">Diagnosis</Label>
                        <Input {...form.register("diagnosis")} placeholder="e.g. Viral Bronchitis" />
                        {form.formState.errors.diagnosis && (
                            <p className="text-sm text-red-500">{form.formState.errors.diagnosis.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="symptoms">Symptoms (comma separated)</Label>
                        <Input {...form.register("symptoms")} placeholder="Cough, Fever, Fatigue" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                            {...form.register("status")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm border-gray-300"
                        >
                            <option value="Active">Active</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Chronic">Chronic</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="prescription">Prescription</Label>
                        <Textarea {...form.register("prescription")} placeholder="Medication details..." />
                        {form.formState.errors.prescription && (
                            <p className="text-sm text-red-500">{form.formState.errors.prescription.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea {...form.register("notes")} placeholder="Additional clinical notes..." />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Record
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default function NewRecordPage() {
    return (
        <div className="max-w-2xl mx-auto py-6">
            <Suspense fallback={<div>Loading form...</div>}>
                <RecordForm />
            </Suspense>
        </div>
    );
}
