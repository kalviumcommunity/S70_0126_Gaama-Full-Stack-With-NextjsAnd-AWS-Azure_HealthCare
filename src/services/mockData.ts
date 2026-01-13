import { Doctor, MedicalRecord, Patient } from "@/types";

export const MOCK_DOCTORS: Doctor[] = [
    {
        id: "d1",
        name: "Dr. Sarah Patel",
        email: "sarah.patel@ruralhealth.org",
        role: "DOCTOR",
        specialization: "General Physician",
        hospital: "Green Valley Community Center",
        licenseNumber: "MED-2024-001",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
        id: "d2",
        name: "Dr. James Carter",
        email: "james.carter@ruralhealth.org",
        role: "DOCTOR",
        specialization: "Cardiologist",
        hospital: "City General Hospital",
        licenseNumber: "MED-2023-089",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
    }
];

export const MOCK_PATIENTS: Patient[] = [
    {
        id: "p1",
        name: "Ramesh Kumar",
        email: "ramesh@example.com",
        role: "PATIENT",
        dateOfBirth: "1980-05-15",
        gender: "Male",
        bloodType: "O+",
        address: "12 Village Road, Rampur district",
        phone: "+91 9876543210",
        emergencyContact: {
            name: "Suresh Kumar",
            phone: "+91 9876543211",
            relation: "Brother"
        },
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh"
    },
    {
        id: "p2",
        name: "Anita Devi",
        email: "anita@example.com",
        role: "PATIENT",
        dateOfBirth: "1992-08-22",
        gender: "Female",
        bloodType: "B+",
        address: "45 Farm Lane, Sonepur",
        phone: "+91 9876543212",
        emergencyContact: {
            name: "Vijay Singh",
            phone: "+91 9876543213",
            relation: "Husband"
        },
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita"
    },
    {
        id: "p3",
        name: "Divyesh Singh",
        email: "divyeshsingh@rural.org",
        role: "PATIENT",
        dateOfBirth: "1995-03-10",
        gender: "Male",
        bloodType: "A+",
        address: "78 Main Street, Patna",
        phone: "+91 9876543214",
        emergencyContact: {
            name: "Priya Singh",
            phone: "+91 9876543215",
            relation: "Sister"
        },
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Divyesh"
    }
];

export const MOCK_RECORDS: MedicalRecord[] = [
    {
        id: "r1",
        patientId: "p1",
        doctorId: "d1",
        doctorName: "Dr. Sarah Patel",
        date: "2024-01-10",
        diagnosis: "Hypertension",
        symptoms: ["Headache", "Dizziness"],
        prescription: "Amlodipine 5mg - Once daily",
        notes: "Patient advised to reduce salt intake and monitor BP daily.",
        status: "Active"
    },
    {
        id: "r2",
        patientId: "p1",
        doctorId: "d1",
        doctorName: "Dr. Sarah Patel",
        date: "2023-11-05",
        diagnosis: "Viral Fever",
        symptoms: ["Fever", "Body ache"],
        prescription: "Paracetamol 650mg - SOS",
        notes: "Recovered fully.",
        status: "Resolved"
    },
    {
        id: "r3",
        patientId: "p2",
        doctorId: "d2",
        doctorName: "Dr. James Carter",
        date: "2024-02-01",
        diagnosis: "Routine Cardiac Checkup",
        symptoms: ["None"],
        prescription: "None",
        notes: "ECG Normal. Continue regular exercise.",
        status: "Resolved"
    }
];
