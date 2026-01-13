import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                    <p className="text-gray-500">Join RuralHealth to manage care effectively</p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" className="h-11" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="name@example.com" className="h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" className="h-11" />
                    </div>

                    <Button className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 transition-colors">
                        Create Account
                    </Button>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>

            </div>
        </AuthLayout>
    );
}
