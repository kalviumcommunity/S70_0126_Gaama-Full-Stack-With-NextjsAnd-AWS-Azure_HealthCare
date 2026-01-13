"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Role } from "@/types";
import Link from "next/link";
import { Loader2, X } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    role: z.enum(["DOCTOR", "PATIENT"] as [string, ...string[]]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [showOAuthModal, setShowOAuthModal] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "sarah.patel@ruralhealth.org", // Pre-fill for demo
            role: "DOCTOR",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setError(null);
        try {
            await login(data.email, data.role as Role);
        } catch (err) {
            setError("Invalid credentials. Please check the email and role.");
        }
    };

    const handleOAuthClick = (provider: string) => {
        setShowOAuthModal(true);
    };

    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-gray-500">Enter your credentials to access your dashboard</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="role">I am a</Label>
                        <div className="relative">
                            <select
                                {...form.register("role")}
                                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 border-gray-200 transition-shadow"
                            >
                                <option value="DOCTOR">Doctor</option>
                                <option value="PATIENT">Patient</option>
                            </select>
                        </div>
                        {form.formState.errors.role && (
                            <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="h-11"
                            {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    {error && <div className="p-3 rounded bg-red-50 text-red-600 text-sm font-medium">{error}</div>}

                    <Button type="submit" className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 transition-colors" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In with Email"
                        )}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-11"
                        onClick={() => handleOAuthClick('Google')}
                        type="button"
                    >
                        Google
                    </Button>
                    <Button
                        variant="outline"
                        className="h-11"
                        onClick={() => handleOAuthClick('Microsoft')}
                        type="button"
                    >
                        Microsoft
                    </Button>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* OAuth Info Modal */}
            {showOAuthModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowOAuthModal(false)}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">OAuth Login</h2>
                            <button onClick={() => setShowOAuthModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                OAuth authentication (Google/Microsoft) requires backend integration and is not available in this frontend demo.
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>To try the app:</strong> Use the email login with one of these demo accounts:
                                </p>
                                <ul className="mt-2 space-y-1 text-sm text-blue-700">
                                    <li>• Doctor: sarah.patel@ruralhealth.org</li>
                                    <li>• Patient: ramesh@example.com</li>
                                    <li>• Patient: divyeshsingh@rural.org</li>
                                </ul>
                            </div>
                        </div>
                        <Button
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                            onClick={() => setShowOAuthModal(false)}
                        >
                            Got it
                        </Button>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}
