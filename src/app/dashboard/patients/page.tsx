"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { patientService } from "@/services/patientService";
import { Patient } from "@/types";
import { Search, X, UserPlus } from "lucide-react";

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newPatient, setNewPatient] = useState({
        name: "",
        email: "",
        dateOfBirth: "",
        gender: "Male",
        bloodType: "O+",
        phone: "",
        address: ""
    });

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await patientService.getAllPatients();
                setPatients(data);
            } catch (error) {
                console.error("Failed to fetch patients", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddPatient = () => {
        const patient: Patient = {
            id: `p${patients.length + 1}`,
            name: newPatient.name,
            email: newPatient.email,
            role: "PATIENT",
            dateOfBirth: newPatient.dateOfBirth,
            gender: newPatient.gender as "Male" | "Female" | "Other",
            bloodType: newPatient.bloodType,
            address: newPatient.address,
            phone: newPatient.phone,
            emergencyContact: {
                name: "",
                phone: "",
                relation: ""
            },
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newPatient.name}`
        };

        setPatients([...patients, patient]);
        setShowAddModal(false);
        setNewPatient({
            name: "",
            email: "",
            dateOfBirth: "",
            gender: "Male",
            bloodType: "O+",
            phone: "",
            address: ""
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Patient
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search patients..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <p>Loading...</p>
                ) : filteredPatients.map((patient) => (
                    <Card key={patient.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <img
                                src={patient.avatar}
                                alt={patient.name}
                                className="h-12 w-12 rounded-full"
                            />
                            <div>
                                <CardTitle className="text-lg">{patient.name}</CardTitle>
                                <CardDescription>{patient.email}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>Gender: {patient.gender}</p>
                                <p>DOB: {patient.dateOfBirth}</p>
                                <p>Phone: {patient.phone}</p>
                            </div>
                            <Link href={`/dashboard/patients/${patient.id}`}>
                                <Button className="w-full mt-4" variant="outline">View Records</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
                {!isLoading && filteredPatients.length === 0 && (
                    <p className="text-muted-foreground col-span-3 text-center py-10">
                        No patients found matching your search.
                    </p>
                )}
            </div>

            {/* Add Patient Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Add New Patient</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <Label>Full Name</Label>
                                <Input
                                    value={newPatient.name}
                                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={newPatient.email}
                                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Date of Birth</Label>
                                    <Input
                                        type="date"
                                        value={newPatient.dateOfBirth}
                                        onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Gender</Label>
                                    <select
                                        value={newPatient.gender}
                                        onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <Label>Blood Type</Label>
                                <select
                                    value={newPatient.bloodType}
                                    onChange={(e) => setNewPatient({ ...newPatient, bloodType: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                >
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input
                                    value={newPatient.phone}
                                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                                    placeholder="+91 9876543210"
                                />
                            </div>
                            <div>
                                <Label>Address</Label>
                                <Input
                                    value={newPatient.address}
                                    onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                                    placeholder="123 Main St, City"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                onClick={handleAddPatient}
                                disabled={!newPatient.name || !newPatient.email}
                            >
                                Add Patient
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
