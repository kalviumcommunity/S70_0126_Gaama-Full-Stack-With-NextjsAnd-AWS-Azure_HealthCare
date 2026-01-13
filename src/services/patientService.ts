import { Patient } from "@/types";
import { MOCK_PATIENTS } from "./mockData";
import { mockApiResponse } from "./api";

export const patientService = {
    getAllPatients: async (): Promise<Patient[]> => {
        // In a real app, this might accept filters/pagination
        return mockApiResponse(MOCK_PATIENTS);
    },

    getPatientById: async (id: string): Promise<Patient | undefined> => {
        const patient = MOCK_PATIENTS.find(p => p.id === id);
        return mockApiResponse(patient);
    }
};
