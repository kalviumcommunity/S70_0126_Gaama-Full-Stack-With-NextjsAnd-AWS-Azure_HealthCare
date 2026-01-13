"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Role } from "@/types";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    login: (email: string, role: Role) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error("Auth check failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, role: Role) => {
        setIsLoading(true);
        try {
            const user = await authService.login(email, role);
            setUser(user);
            router.push("/dashboard");
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null);
            router.push("/login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
