"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin, Plus, X } from "lucide-react";
import { useState } from "react";

interface Appointment {
    id: number;
    patient: string;
    time: string;
    date: string;
    type: string;
    status: string;
    mode: string;
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: 1, patient: "Ramesh Kumar", time: "09:00 AM", date: "Today", type: "Follow-up", status: "Confirmed", mode: "In-person" },
        { id: 2, patient: "Anita Devi", time: "10:30 AM", date: "Today", type: "Consultation", status: "Confirmed", mode: "Video" },
        { id: 3, patient: "Rajesh Singh", time: "02:00 PM", date: "Today", type: "Initial Visit", status: "Pending", mode: "In-person" },
        { id: 4, patient: "Priya Sharma", time: "11:00 AM", date: "Tomorrow", type: "Check-up", status: "Confirmed", mode: "In-person" },
        { id: 5, patient: "Amit Patel", time: "03:30 PM", date: "Tomorrow", type: "Follow-up", status: "Cancelled", mode: "Video" },
    ]);

    const [viewingAppointment, setViewingAppointment] = useState<Appointment | null>(null);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
    const [editForm, setEditForm] = useState<Appointment | null>(null);
    const [showNewModal, setShowNewModal] = useState(false);

    const handleEdit = (apt: Appointment) => {
        setEditingAppointment(apt);
        setEditForm({ ...apt });
    };

    const handleSaveChanges = () => {
        if (editForm) {
            setAppointments(appointments.map((apt) => (apt.id === editForm.id ? editForm : apt)));
            setEditingAppointment(null);
            setEditForm(null);
        }
    };

    const updateEditForm = (field: keyof Appointment, value: string) => {
        if (editForm) {
            setEditForm({ ...editForm, [field]: value });
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* ===== HEADER ===== */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Appointments
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your upcoming appointments
                    </p>

                    {/* 🔥 NEW LINE ADDED FOR TODAY'S PR */}
                    <p className="text-xs text-blue-600 mt-1">
                        Showing today and upcoming appointments
                    </p>
                </div>

                <Button
                    className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                    onClick={() => setShowNewModal(true)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                </Button>
            </div>

            {/* ===== APPOINTMENTS LIST ===== */}
            <div className="grid gap-6">
                {appointments.map((apt) => (
                    <Card
                        key={apt.id}
                        className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                                        {apt.patient[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {apt.patient}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {apt.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {apt.time}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                {apt.mode === "Video" ? (
                                                    <Video className="h-4 w-4" />
                                                ) : (
                                                    <MapPin className="h-4 w-4" />
                                                )}
                                                {apt.mode}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-700">
                                            {apt.type}
                                        </p>
                                        <div
                                            className={`text-xs px-3 py-1 rounded-full font-medium mt-1 inline-block
                      ${apt.status === "Confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : apt.status === "Pending"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {apt.status}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => setViewingAppointment(apt)}>
                                            View
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-blue-600 hover:text-blue-700"
                                            onClick={() => handleEdit(apt)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
