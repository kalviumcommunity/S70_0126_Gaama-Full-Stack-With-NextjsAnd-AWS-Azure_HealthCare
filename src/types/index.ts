export type Role = 'DOCTOR' | 'PATIENT';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

export interface Patient extends User {
    role: 'PATIENT';
    dateOfBirth: string; // ISO Date
    gender: 'Male' | 'Female' | 'Other';
    bloodType: string;
    address: string;
    phone: string;
    emergencyContact: {
        name: string;
        phone: string;
        relation: string;
    };
}

export interface Doctor extends User {
    role: 'DOCTOR';
    specialization: string;
    hospital: string;
    licenseNumber: string;
}

export interface MedicalRecord {
    id: string;
    patientId: string;
    doctorId: string;
    doctorName: string; // Denormalized for easier display
    date: string; // ISO Date
    diagnosis: string;
    symptoms: string[];
    prescription: string;
    notes: string;
    status: 'Active' | 'Resolved' | 'Chronic';
    attachments?: string[]; // URLs or placeholders
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
