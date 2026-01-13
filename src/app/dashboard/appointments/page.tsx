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
    const [newAppointment, setNewAppointment] = useState({
        patient: "",
        time: "",
        date: "",
        type: "Consultation",
        status: "Pending",
        mode: "In-person"
    });

    const handleEdit = (apt: Appointment) => {
        setEditingAppointment(apt);
        setEditForm({ ...apt }); // Create a copy for editing
    };

    const handleSaveChanges = () => {
        if (editForm) {
            setAppointments(appointments.map(apt =>
                apt.id === editForm.id ? editForm : apt
            ));
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Appointments</h1>
                    <p className="text-gray-500 mt-1">Manage your upcoming appointments</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20" onClick={() => setShowNewModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                </Button>
            </div>

            <div className="grid gap-6">
                {appointments.map((apt) => (
                    <Card key={apt.id} className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                                        {apt.patient[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{apt.patient}</h3>
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
                                                {apt.mode === "Video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                                                {apt.mode}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-700">{apt.type}</p>
                                        <div className={`text-xs px-3 py-1 rounded-full font-medium mt-1 inline-block
                      ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-red-100 text-red-700'}`}>
                                            {apt.status}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setViewingAppointment(apt)}
                                        >
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

            {/* View Modal */}
            {viewingAppointment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setViewingAppointment(null)}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Appointment Details</h2>
                            <button onClick={() => setViewingAppointment(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Patient</label>
                                <p className="text-gray-900 font-semibold">{viewingAppointment.patient}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Date</label>
                                    <p className="text-gray-900">{viewingAppointment.date}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Time</label>
                                    <p className="text-gray-900">{viewingAppointment.time}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Type</label>
                                <p className="text-gray-900">{viewingAppointment.type}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Mode</label>
                                    <p className="text-gray-900">{viewingAppointment.mode}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <p className={`font-semibold ${viewingAppointment.status === 'Confirmed' ? 'text-green-600' :
                                        viewingAppointment.status === 'Pending' ? 'text-amber-600' :
                                            'text-red-600'
                                        }`}>{viewingAppointment.status}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setViewingAppointment(null)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingAppointment && editForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => {
                    setEditingAppointment(null);
                    setEditForm(null);
                }}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Edit Appointment</h2>
                            <button onClick={() => {
                                setEditingAppointment(null);
                                setEditForm(null);
                            }} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Patient</label>
                                <input
                                    type="text"
                                    value={editForm.patient}
                                    onChange={(e) => updateEditForm('patient', e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="text"
                                        value={editForm.date}
                                        onChange={(e) => updateEditForm('date', e.target.value)}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Time</label>
                                    <input
                                        type="text"
                                        value={editForm.time}
                                        onChange={(e) => updateEditForm('time', e.target.value)}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Type</label>
                                <select
                                    value={editForm.type}
                                    onChange={(e) => updateEditForm('type', e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option>Follow-up</option>
                                    <option>Consultation</option>
                                    <option>Initial Visit</option>
                                    <option>Check-up</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Mode</label>
                                    <select
                                        value={editForm.mode}
                                        onChange={(e) => updateEditForm('mode', e.target.value)}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    >
                                        <option>In-person</option>
                                        <option>Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => updateEditForm('status', e.target.value)}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    >
                                        <option>Confirmed</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => {
                                setEditingAppointment(null);
                                setEditForm(null);
                            }}>
                                Cancel
                            </Button>
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Appointment Modal */}
            {showNewModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewModal(false)}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">New Appointment</h2>
                            <button onClick={() => setShowNewModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Patient Name</label>
                                <input
                                    type="text"
                                    value={newAppointment.patient}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Enter patient name"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="text"
                                        value={newAppointment.date}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="Today/Tomorrow"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Time</label>
                                    <input
                                        type="text"
                                        value={newAppointment.time}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="09:00 AM"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Type</label>
                                <select
                                    value={newAppointment.type}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option>Follow-up</option>
                                    <option>Consultation</option>
                                    <option>Initial Visit</option>
                                    <option>Check-up</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Mode</label>
                                    <select
                                        value={newAppointment.mode}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, mode: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    >
                                        <option>In-person</option>
                                        <option>Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={newAppointment.status}
                                        onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    >
                                        <option>Confirmed</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setShowNewModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                onClick={() => {
                                    const newApt: Appointment = {
                                        id: appointments.length + 1,
                                        patient: newAppointment.patient,
                                        time: newAppointment.time,
                                        date: newAppointment.date,
                                        type: newAppointment.type,
                                        status: newAppointment.status,
                                        mode: newAppointment.mode
                                    };
                                    setAppointments([...appointments, newApt]);
                                    setShowNewModal(false);
                                    setNewAppointment({
                                        patient: "",
                                        time: "",
                                        date: "",
                                        type: "Consultation",
                                        status: "Pending",
                                        mode: "In-person"
                                    });
                                }}
                                disabled={!newAppointment.patient || !newAppointment.time || !newAppointment.date}
                            >
                                Create Appointment
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
