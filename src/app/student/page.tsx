import { prisma } from "@/lib/prisma";
import Link from "next/link";
import StudentSearchForm from "./StudentSearchForm";

export const dynamic = "force-dynamic";

export default async function StudentListPage() {
  const materials = await prisma.material.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-10 border-b-4 border-black pb-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">RuangLokal AI // Panel Siswa</h1>
          <p className="mt-2 text-lg font-bold uppercase text-gray-700">Materi & Kuis Pembelajaran Kontekstual</p>
        </div>
      </header>

      <div className="relative">
        <Link 
          href="/" 
          className="absolute -right-6 md:-right-12 top-0 w-10 h-10 flex items-center justify-center bg-white border-2 border-black hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-0.5 active:translate-x-0.5 z-10"
          title="Kembali ke Beranda"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={3.5} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" 
            />
          </svg>
        </Link>

        {/* Search Module by ID */}
        <StudentSearchForm />

        {/* List of Available Modules */}
        <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">Modul Pembelajaran Tersedia</h2>
        
        {materials.length === 0 ? (
          <p className="font-bold text-gray-500 uppercase py-6 text-center">Belum ada modul yang dibuat oleh guru.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {materials.map((m) => (
              <div 
                key={m.id} 
                className="border-2 border-black p-5 bg-gray-50 hover:bg-highlight transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-black text-white px-2 py-0.5 text-xs font-mono font-bold">KODE: {m.id}</span>
                    <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 text-xs font-bold uppercase">{m.grade}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase">{m.topic}</h3>
                  <p className="text-sm font-bold text-gray-600 mt-1">WILAYAH KONTEKS: {m.region}</p>
                </div>
                <Link 
                  href={`/student/${m.id}`} 
                  className="bg-primary text-white font-black uppercase text-sm py-3 px-6 border-2 border-black hover:bg-blue-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 whitespace-nowrap"
                >
                  MULAI BELAJAR
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
