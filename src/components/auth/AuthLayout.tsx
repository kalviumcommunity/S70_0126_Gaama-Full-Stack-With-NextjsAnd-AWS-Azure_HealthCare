import Image from "next/image";
import { Activity } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Side - Form */}
            <div className="flex w-full flex-col justify-center px-4 md:w-1/2 lg:w-[45%] xl:px-12">
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="mb-8 flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">RuralHealth</span>
                    </div>
                    {children}
                    <p className="mt-8 text-center text-sm text-gray-500">
                        &copy; 2024 RuralHealthConnect. Secure Framework v1.0
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden w-1/2 bg-gray-50 lg:block relative overflow-hidden">
                <Image
                    src="/login-bg.png"
                    alt="Medical Technology Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-[1px]" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Empowering Rural Care</h2>
                    <p className="text-lg opacity-90">Helping thousands of doctors connect with patients in remote areas through secure, reliable technology.</p>
                </div>
            </div>
        </div>
    );
}
