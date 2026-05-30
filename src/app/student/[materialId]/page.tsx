import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { StudentModule } from "@/components/StudentModule";
import Link from "next/link";

export default async function StudentPage({ params }: { params: Promise<{ materialId: string }> }) {
  const { materialId } = await params;
  const id = parseInt(materialId, 10);
  
  if (isNaN(id)) return notFound();

  const material = await prisma.material.findUnique({
    where: { id },
  });

  if (!material) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-8 mb-8 flex justify-between items-start">
        <div>
          <div className="inline-block bg-black text-white px-4 py-2 font-bold uppercase border-2 border-black mb-4">
            RUANGLOKAL AI // TAMPILAN SISWA
          </div>
          <h1 className="text-3xl font-black uppercase">{material.topic}</h1>
          <p className="text-xl font-medium border-l-4 border-black pl-3 mt-2">
            Kelas: {material.grade} | Wilayah Konteks: {material.region}
          </p>
        </div>
        <Link 
          href="/student" 
          className="bg-black text-white font-bold uppercase text-sm py-2 px-4 border-2 border-black hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
        >
          KEMBALI
        </Link>
      </div>
      <StudentModule 
        lessonPlan={material.lessonPlan} 
        quizJson={material.quizJson} 
        region={material.region} 
      />
    </div>
  );
}
