import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, grade, region } = await req.json();

    if (!topic || !grade || !region) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 
    
    const prompt = `You are an Indonesian curriculum expert. Output ONLY a strictly valid JSON object with this exact structure:
    {
      "lessonPlan": "A markdown lesson plan for grade ${grade} on topic '${topic}' tailored with local examples from ${region}. Use clear headings, bullet points, and plain text paragraphs.",
      "quiz": [
        {
          "question": "Multiple choice question 1...",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Exact string matching the correct option"
        }
      ]
    }
    The quiz array MUST contain exactly 5 objects.
    IMPORTANT: Ensure all double quotes inside the string values (like lessonPlan) are properly escaped with a backslash (\\\"). DO NOT wrap the output in markdown code blocks (\`\`\`json). Return plain JSON only.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let data;
    try {
      let rawText = response.text || '{}';
      rawText = rawText.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
      data = JSON.parse(rawText);
    } catch (e: any) {
      console.error("JSON parse error:", e);
      console.error("Raw response from AI:", response.text);
      throw new Error("Gagal memproses respon dari AI karena format JSON tidak valid. Silakan coba klik GENERATE lagi.");
    }

    const material = await prisma.material.create({
      data: {
        topic,
        grade,
        region,
        lessonPlan: data.lessonPlan || '',
        quizJson: JSON.stringify(data.quiz || []),
      }
    });

    return NextResponse.json({ id: material.id });
  } catch (error: any) {
    console.error("Error generating lesson:", error);
    return NextResponse.json({ error: error.message || "Failed to generate lesson" }, { status: 500 });
  }
}
