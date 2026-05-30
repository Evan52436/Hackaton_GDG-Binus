"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "0000") {
      router.push("/teacher");
    } else {
      setError("PIN SALAH!");
      setPin("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gray-50">
      <div className="w-full max-w-2xl text-center mb-10 border-b-4 border-black pb-6">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">RUANGLOKAL AI</h1>
        <p className="text-xl font-bold uppercase text-gray-700">Platform Pembelajaran Kontekstual & Kearifan Lokal Nusantara</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Guru Card */}
        <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="inline-block bg-black text-white px-3 py-1 font-bold uppercase text-xs mb-4">
              UNTUK GURU
            </div>
            <h2 className="text-2xl font-black uppercase mb-4">PANEL GURU</h2>
            <p className="font-medium text-gray-700 mb-8 leading-relaxed">
              Buat Rencana Pelaksanaan Pembelajaran (RPP) / Modul serta kuis interaktif secara instan yang disesuaikan dengan contoh nyata daerah asal siswa.
            </p>
          </div>
          <button 
            onClick={() => { setShowPin(true); setError(""); setPin(""); }}
            className="w-full text-center bg-primary text-white font-black uppercase py-4 border-2 border-black hover:bg-blue-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 block"
          >
            MASUK PANEL GURU
          </button>
        </div>

        {/* Siswa Card */}
        <div className="border-4 border-black p-8 bg-highlight shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="inline-block bg-black text-white px-3 py-1 font-bold uppercase text-xs mb-4">
              UNTUK SISWA
            </div>
            <h2 className="text-2xl font-black uppercase mb-4">PANEL SISWA</h2>
            <p className="font-medium text-gray-700 mb-8 leading-relaxed">
              Pelajari materi sekolah Anda dengan analogi, istilah lokal, dan contoh sehari-hari yang dekat dengan budaya serta wilayah Anda tinggal.
            </p>
          </div>
          <Link 
            href="/student" 
            className="w-full text-center bg-black text-white font-black uppercase py-4 border-2 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 block"
          >
            MASUK PANEL SISWA
          </Link>
        </div>
      </div>
      
      <footer className="mt-16 text-center font-bold uppercase text-sm text-gray-500">
        © 2026 RuangLokal AI // Hackathon GDG Binus
      </footer>

      {showPin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black p-8 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <button 
              onClick={() => setShowPin(false)}
              className="absolute top-4 right-4 text-black font-black text-xl hover:text-gray-600"
            >
              X
            </button>
            <h2 className="text-3xl font-black uppercase mb-4 border-b-4 border-black pb-2">MASUKKAN PIN</h2>
            <p className="font-bold text-gray-700 mb-6">Masukkan PIN untuk mengakses Panel Guru.</p>
            <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
              <input 
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="****"
                className="w-full text-center text-4xl tracking-[1em] font-mono border-4 border-black p-4 focus:outline-none focus:ring-4 focus:ring-primary focus:border-black"
                autoFocus
              />
              {error && <p className="text-red-600 font-bold uppercase">{error}</p>}
              <button 
                type="submit"
                className="w-full bg-black text-white font-black uppercase py-4 border-2 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
              >
                VERIFIKASI
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
