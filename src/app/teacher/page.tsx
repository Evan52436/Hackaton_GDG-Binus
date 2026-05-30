"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function TeacherPage() {
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultId, setResultId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [materials, setMaterials] = useState<any[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);

  const fetchMaterials = async () => {
    setLoadingMaterials(true);
    try {
      const res = await fetch("/api/materials");
      const data = await res.json();
      if (data.materials) setMaterials(data.materials);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMaterials(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus modul ini?")) return;
    try {
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMaterials((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultId(null);

    try {
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, grade, region }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membuat modul");
      setResultId(data.id);
      fetchMaterials();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-6 border-b-4 border-black pb-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter">RuangLokal AI // Panel Guru</h1>
        <p className="mt-2 text-lg font-bold uppercase text-gray-700">Generator Modul & Kuis Kontekstual</p>
      </header>

      <div className={`flex flex-col lg:flex-row gap-12 items-start ${materials.length === 0 ? "justify-center" : ""}`}>
        {/* Kiri: Daftar Modul (Hanya tampil jika ada data) */}
        {materials.length > 0 && (
          <div className="w-full lg:w-1/2 order-2 lg:order-1 border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">Daftar Modul yang Telah Dibuat</h2>
            {loadingMaterials ? (
              <p className="font-bold">Memuat data...</p>
            ) : (
              <div className="flex flex-col gap-4">
                {materials.map((m) => (
                  <div key={m.id} className="border-2 border-black p-4 flex flex-col justify-between gap-4 bg-gray-50 hover:bg-highlight transition-colors">
                    <div>
                      <h3 className="font-black uppercase text-lg">{m.topic}</h3>
                      <p className="text-sm font-bold text-gray-600">ID: {m.id} | Kelas: {m.grade} | Wilayah: {m.region}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="bg-red-500 text-white font-bold uppercase px-4 py-2 border-2 border-black hover:bg-red-700 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-0.5 active:translate-x-0.5 whitespace-nowrap self-start"
                    >
                      HAPUS
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Kanan / Tengah: Form Generator */}
        <div className={`w-full ${materials.length > 0 ? "lg:w-1/2 order-1 lg:order-2" : "max-w-3xl"}`}>
          <div className="relative mb-10">
            <div className="absolute -right-6 md:-right-12 top-0 flex flex-col gap-3 z-10">
              <button 
                type="button"
                onClick={() => setShowHelp(true)}
                className="w-10 h-10 flex items-center justify-center bg-highlight border-2 border-black font-black text-xl hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-0.5 active:translate-x-0.5"
                title="Petunjuk Penggunaan"
              >
                ?
              </button>
              <Link 
                href="/" 
                className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-0.5 active:translate-x-0.5"
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
            </div>
            <form onSubmit={handleGenerate} className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm">Topik Pembelajaran</label>
                <input 
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: Fotosintesis, Sejarah Kemerdekaan, dsb." 
                  className="border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm">Kelas</label>
                <input 
                  required
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Contoh: SD Kelas 4" 
                  className="border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm">Wilayah / Daerah Konteks</label>
                <input 
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Contoh: Papua, Jawa Barat, pesisir pantai" 
                  className="border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="mt-4 bg-primary text-white font-bold uppercase tracking-widest py-4 border-2 border-black hover:bg-blue-800 disabled:bg-gray-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
              >
                {loading ? "MENGHASILKAN MODUL..." : "GENERATE MODUL & KUIS"}
              </button>
            </div>
            {error && <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 font-bold text-red-700 uppercase">{error}</div>}
          </form>
          </div>

          {resultId && (
            <div className="border-2 border-black p-6 bg-highlight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black uppercase mb-4">Modul Berhasil Dibuat!</h2>
              <p className="mb-6 font-bold">Modul dan kuis telah tersimpan di database.</p>
              <Link href={`/student/${resultId}`} className="inline-block bg-black text-white font-bold uppercase py-3 px-6 hover:bg-gray-800 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1">
                BUKA TAMPILAN SISWA (ID: {resultId})
              </Link>
            </div>
          )}
        </div>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black p-8 max-w-2xl w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <h2 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">Petunjuk Penggunaan Panel Guru</h2>
            
            <div className="flex flex-col gap-6 text-sm md:text-base">
              <div>
                <h3 className="font-black uppercase text-primary border-b border-black pb-1 mb-2">1. Topik Pembelajaran</h3>
                <p className="font-medium text-gray-700 leading-relaxed">
                  Masukkan materi atau konsep pelajaran yang ingin diajarkan. 
                  <br />
                  <span className="text-gray-500 font-mono text-xs">Contoh: "Fotosintesis", "Gaya Gesek", "Kerajaan Majapahit".</span>
                </p>
              </div>

              <div>
                <h3 className="font-black uppercase text-primary border-b border-black pb-1 mb-2">2. Kelas</h3>
                <p className="font-medium text-gray-700 leading-relaxed">
                  Tentukan tingkatan kelas siswa. AI akan menyesuaikan tingkat kesulitan bahasa dan penjelasan materi agar sesuai dengan perkembangan kognitif usia mereka.
                  <br />
                  <span className="text-gray-500 font-mono text-xs">Contoh: "SD Kelas 4", "SMP Kelas 7", "SMA Kelas 11".</span>
                </p>
              </div>

              <div>
                <h3 className="font-black uppercase text-primary border-b border-black pb-1 mb-2">3. Wilayah / Daerah Konteks</h3>
                <p className="font-medium text-gray-700 leading-relaxed">
                  Masukkan daerah, budaya, suku, atau ekosistem tempat tinggal siswa Anda. 
                  AI akan mengintegrasikan kearifan lokal, flora/fauna setempat, serta istilah daerah tersebut ke dalam materi dan kuis agar lebih relevan dan mudah dipahami siswa.
                  <br />
                  <span className="text-gray-500 font-mono text-xs">Contoh: "Papua", "Pesisir Pantai", "Pegunungan", "Jawa Barat".</span>
                </p>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setShowHelp(false)}
              className="mt-8 w-full bg-black text-white font-black uppercase py-3 border-2 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
            >
              SAYA MENGERTI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
