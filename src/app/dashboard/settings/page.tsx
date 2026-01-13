"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Bell, Lock, User, Globe, Check, Shield } from "lucide-react";
import { useState, useEffect } from "react";

export default function SettingsPage() {
    const { user } = useAuth();
    const [language, setLanguage] = useState("English");
    const [timezone, setTimezone] = useState("IST (UTC+5:30)");
    const [theme, setTheme] = useState("Light");
    const [saved, setSaved] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);
    const [securitySaved, setSecuritySaved] = useState(false);

    // Check if user is in demo mode
    const isDemoMode = user?.id?.startsWith('demo-');

    // Load preferences from localStorage on mount
    useEffect(() => {
        const savedPrefs = localStorage.getItem("userPreferences");
        if (savedPrefs) {
            const prefs = JSON.parse(savedPrefs);
            setLanguage(prefs.language || "English");
            setTimezone(prefs.timezone || "IST (UTC+5:30)");
            setTheme(prefs.theme || "Light");
        }
    }, []);

    const savePreferences = () => {
        const preferences = { language, timezone, theme };
        localStorage.setItem("userPreferences", JSON.stringify(preferences));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const saveProfile = () => {
        if (isDemoMode) {
            alert("Profile changes are disabled in demo mode for security.");
            return;
        }
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 2000);
    };

    const savePassword = () => {
        if (isDemoMode) {
            alert("Password changes are disabled in demo mode for security.");
            return;
        }
        setSecuritySaved(true);
        setTimeout(() => setSecuritySaved(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
            </div>

            {isDemoMode && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Shield className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-amber-900">Demo Mode Active</p>
                            <p className="text-sm text-amber-700">You're viewing anonymized demo data. Profile and password changes are disabled for security.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input defaultValue={user?.name} disabled={isDemoMode} />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                defaultValue={isDemoMode ? "demo@example.com" : user?.email}
                                type="email"
                                disabled={isDemoMode}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Input defaultValue={user?.role} disabled />
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={saveProfile}>
                            {profileSaved ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Saved!
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <Lock className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <CardTitle>Security</CardTitle>
                                <CardDescription>Manage your password and security</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Current Password</Label>
                            <Input type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <Label>New Password</Label>
                            <Input type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <Input type="password" placeholder="••••••••" />
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={savePassword}>
                            {securitySaved ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Updated!
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Configure your notification preferences</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                            <input type="checkbox" className="h-5 w-5" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">SMS Alerts</p>
                                <p className="text-sm text-gray-500">Get text message alerts</p>
                            </div>
                            <input type="checkbox" className="h-5 w-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Push Notifications</p>
                                <p className="text-sm text-gray-500">Browser push notifications</p>
                            </div>
                            <input type="checkbox" className="h-5 w-5" defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Globe className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>Customize your experience</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Language</Label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Tamil</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Timezone</Label>
                            <select
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option>IST (UTC+5:30)</option>
                                <option>UTC</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Theme</Label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option>Light</option>
                                <option>Dark</option>
                                <option>Auto</option>
                            </select>
                        </div>
                        <Button
                            onClick={savePreferences}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
                        >
                            {saved ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Saved!
                                </>
                            ) : (
                                "Save Preferences"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
