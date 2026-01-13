import { User, Role } from "@/types";
import { MOCK_DOCTORS, MOCK_PATIENTS } from "./mockData";
import { mockApiResponse } from "./api";

const AUTH_KEY = "rural_health_auth";

export const authService = {
    login: async (email: string, role: Role): Promise<User> => {
        // Simulate finding user
        const user = role === 'DOCTOR'
            ? MOCK_DOCTORS.find(d => d.email === email)
            : MOCK_PATIENTS.find(p => p.email === email);

        if (!user) {
            throw new Error("Invalid credentials"); // Simulating 401
        }

        if (typeof window !== 'undefined') {
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        }
        return mockApiResponse(user);
    },

    logout: async (): Promise<void> => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(AUTH_KEY);
        }
        return mockApiResponse(undefined);
    },

    getCurrentUser: async (): Promise<User | null> => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(AUTH_KEY);
            if (stored) return JSON.parse(stored);
        }
        return null;
    }
};
