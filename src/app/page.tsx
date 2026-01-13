"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wifi, Users, Activity, X, Play } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const router = useRouter();

  const startDemo = (role: 'doctor' | 'patient') => {
    // Auto-login with DEMO credentials (not real user data)
    const demoUser = role === 'doctor'
      ? {
        id: 'demo-doctor',
        name: 'Demo Doctor',
        email: 'demo.doctor@example.com',
        role: 'DOCTOR',
        specialization: 'General Physician',
        hospital: 'Demo Clinic'
      }
      : {
        id: 'demo-patient',
        name: 'Demo Patient',
        email: 'demo.patient@example.com',
        role: 'PATIENT',
        dateOfBirth: '1990-01-01',
        gender: 'Other',
        bloodType: 'O+',
        phone: '+91 XXXX-XXXX',
        address: 'Demo Address'
      };

    localStorage.setItem('user', JSON.stringify(demoUser));
    setShowDemoModal(false);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link className="flex items-center gap-2" href="#">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">RuralHealth</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white/0 z-10" />
          </div>
          <div className="container px-4 md:px-6 mx-auto relative z-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                  Now available in 50+ districts
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900 leading-tight">
                  Bridging the Gap in <span className="text-blue-600">Rural Healthcare</span>
                </h1>
                <p className="max-w-[600px] text-lg text-gray-600 md:text-xl leading-relaxed">
                  A unified digital health platform connecting village clinics with city specialists.
                  Secure, accessible, and life-saving.
                </p>
                <div className="flex gap-4 pt-2">
                  <Link href="/login">
                    <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base"
                    onClick={() => setShowDemoModal(true)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </div>
                <div className="pt-8 flex items-center gap-8 text-gray-500">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} className="h-10 w-10 rounded-full border-2 border-white shadow-sm bg-gray-200" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                    ))}
                  </div>
                  <p className="text-sm font-medium">Trusted by 10,000+ patients</p>
                </div>
              </div>
              <div className="relative lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100 group">
                <Image
                  src="/hero-image.png"
                  alt="Doctor consulting patient in rural setting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 bg-gray-50/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to manage care</h2>
              <p className="text-lg text-gray-600">Built for low-bandwidth environments without compromising on security or capability.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: "Bank-Grade Security",
                  desc: "End-to-end encryption ensures patient records remain private and compliant with health regulations."
                },
                {
                  icon: Wifi,
                  title: "Offline-First Design",
                  desc: "Works seamlessly even with spotty internet connection. Data syncs automatically when online."
                },
                {
                  icon: Users,
                  title: "Seamless Interop",
                  desc: "Connects easily with existing hospital systems and supports standard FHIR data formats."
                }
              ].map((feature, i) => (
                <div key={i} className="relative group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">RuralHealth</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 RuralHealthConnect. Built for impact.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">Privacy</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">Terms</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDemoModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Choose Demo Role</h2>
              <button onClick={() => setShowDemoModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-2">Select a role to explore the dashboard</p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
              <p className="text-xs text-amber-800">
                <strong>Note:</strong> Demo mode uses anonymized sample data. No real patient information is displayed.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => startDemo('doctor')}
                className="w-full p-4 border-2 border-blue-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Activity className="h-6 w-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Doctor Demo</p>
                    <p className="text-sm text-gray-500">View all patients and manage records</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => startDemo('patient')}
                className="w-full p-4 border-2 border-emerald-200 rounded-lg hover:border-emerald-600 hover:bg-emerald-50 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                    <Users className="h-6 w-6 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Patient Demo</p>
                    <p className="text-sm text-gray-500">View your personal health records</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
