import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <Sidebar />
            </div>
            <div className="flex flex-col relative overflow-hidden">
                {/* Mobile Header could go here */}
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 relative z-10">
                    {children}
                </main>
                {/* Background decoration */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[100px]" />
                    <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-indigo-200/40 blur-[100px]" />
                </div>
            </div>
        </div>
    );
}
