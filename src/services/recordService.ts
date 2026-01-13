import { MedicalRecord } from "@/types";
import { MOCK_RECORDS } from "./mockData";
import { mockApiResponse } from "./api";

// We'll use a local variable to store records in memory for this session
// In a real app, this would be a database. 
// Ideally we could read from localStorage to persist new records across refreshes.
let currentRecords = [...MOCK_RECORDS];

export const recordService = {
    getRecordsByPatientId: async (patientId: string): Promise<MedicalRecord[]> => {
        const records = currentRecords.filter(r => r.patientId === patientId);
        return mockApiResponse(records);
    },

    createRecord: async (record: Omit<MedicalRecord, 'id'>): Promise<MedicalRecord> => {
        const newRecord: MedicalRecord = {
            ...record,
            id: `r${Date.now()}` // Simple ID generation
        };
        currentRecords.unshift(newRecord);
        return mockApiResponse(newRecord);
    }
};
