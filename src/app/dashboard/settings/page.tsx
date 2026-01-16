"use client";

export default function SettingsPage() {
    return (
        <div className="p-6 flex flex-col gap-6">
            {/* ===== SETTINGS HEADER ===== */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Settings
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage your account preferences and application settings
                </p>
            </div>

            {/* ===== SETTINGS CONTENT (existing / future) ===== */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
                {/* Settings options will be managed from here */}
                Update your profile, preferences, and other configuration options.
            </div>
        </div>
    );
}
