import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { textSnippet, region } = await req.json();

    if (!textSnippet || !region) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Explain the following concept simply, using analogies specific to the daily life and culture of the region: ${region}. Return plain text only.\n\nConcept:\n${textSnippet}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ localizedText: response.text });
  } catch (error: any) {
    console.error("Error localizing concept:", error);
    return NextResponse.json({ error: error.message || "Failed to localize concept" }, { status: 500 });
  }
}
