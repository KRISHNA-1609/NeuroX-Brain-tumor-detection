"use client";

import { useState } from "react";
import Link from "next/link";
import { saveAppointment } from "@/utils/clinicalStore";

export default function TelemedicinePage() {
  const [form, setForm] = useState({ patientName: "", date: "", time: "", note: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    saveAppointment({
      id: Date.now(),
      ...form,
      status: "Pending",
    });
    setMessage("Appointment booked successfully.");
    setForm({ patientName: "", date: "", time: "", note: "" });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Telemedicine</p>
          <h1 className="text-3xl font-semibold text-white">Book a consultation</h1>
          <p className="text-sm text-zinc-400 mt-2">Link MRI results with follow-up care and clinician scheduling.</p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Patient name</label>
              <input value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} className="w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-white" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-white" required />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Time</label>
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-white" required />
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Notes</label>
              <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-white min-h-[110px]" placeholder="Share reason for visit or scan context" />
            </div>
            <button type="submit" className="w-full py-3 rounded-lg bg-white text-black font-medium">Save appointment</button>
            {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
          </form>

          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white">Why it matters</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li>• Connect imaging results with clinician follow-up.</li>
              <li>• Reduce delays between diagnosis and consultation.</li>
              <li>• Support remote care and multi-site clinics.</li>
            </ul>
            <Link href="/dashboard" className="inline-flex mt-6 text-sm text-indigo-400">Go to dashboard →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
