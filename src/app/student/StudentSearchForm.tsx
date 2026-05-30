"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentSearchForm() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/student/${code.trim()}`);
  };

  return (
    <form onSubmit={handleSearch} className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-10">
      <div className="flex flex-col gap-4">
        <label className="font-bold uppercase text-sm">Masuk Menggunakan Kode Modul</label>
        <div className="flex gap-4">
          <input
            type="number"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Contoh: 1, 2, 3..."
            className="flex-1 border-2 border-black p-3 rounded-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold uppercase px-6 border-2 border-black hover:bg-blue-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
          >
            BUKA MODUL
          </button>
        </div>
      </div>
    </form>
  );
}
