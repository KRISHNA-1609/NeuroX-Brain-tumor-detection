"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { readPatientHistory, readAppointments } from "@/utils/clinicalStore";

export default function DashboardPage() {
  const [history, setHistory] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setHistory(readPatientHistory());
    setAppointments(readAppointments());
  }, []);

  const stats = useMemo(() => ({
    patients: history.length,
    appointments: appointments.length,
    pending: appointments.filter((item) => item.status === "Pending").length,
  }), [history, appointments]);

  return (
    <div className="min-h-screen bg-black text-zinc-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Clinical dashboard</p>
            <h1 className="text-3xl font-semibold text-white">Doctor workspace</h1>
            <p className="text-sm text-zinc-400 mt-2">Track scans, review case history, and manage consultations in one place.</p>
          </div>
          <Link href="/brain-tumor-app" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white text-black font-medium">Open MRI analyzer</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-zinc-500">Cases reviewed</p>
            <p className="text-2xl font-semibold text-white mt-2">{stats.patients}</p>
          </div>
          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-zinc-500">Appointments</p>
            <p className="text-2xl font-semibold text-white mt-2">{stats.appointments}</p>
          </div>
          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-zinc-500">Pending follow-ups</p>
            <p className="text-2xl font-semibold text-white mt-2">{stats.pending}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white">Recent patient history</h2>
            <div className="mt-4 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-zinc-500">No patient cases recorded yet.</p>
              ) : history.map((item) => (
                <div key={item.id} className="border border-white/10 rounded-lg p-3">
                  <div className="flex justify-between gap-3">
                    <p className="text-white font-medium">{item.patientName || "Unnamed patient"}</p>
                    <span className="text-xs text-indigo-400">{item.severityLevel}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">{item.tumorType} • {item.size} cm³</p>
                  <p className="text-xs text-zinc-500 mt-2">{item.scanDate}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white">Upcoming consultations</h2>
            <div className="mt-4 space-y-3">
              {appointments.length === 0 ? (
                <p className="text-sm text-zinc-500">No appointments scheduled yet.</p>
              ) : appointments.map((item) => (
                <div key={item.id} className="border border-white/10 rounded-lg p-3">
                  <div className="flex justify-between gap-3">
                    <p className="text-white font-medium">{item.patientName}</p>
                    <span className="text-xs text-amber-400">{item.status}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">{item.date} • {item.time}</p>
                  <p className="text-xs text-zinc-500 mt-2">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
