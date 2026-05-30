"use client";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ParagraphWithLocalizer } from './ParagraphWithLocalizer';

export function StudentModule({ 
  lessonPlan, 
  quizJson, 
  region 
}: { 
  lessonPlan: string, 
  quizJson: string, 
  region: string 
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  let quiz: any[] = [];
  try {
    quiz = JSON.parse(quizJson);
  } catch (e) {
    console.error("Invalid quiz JSON", e);
  }

  const handleSubmit = () => {
    let s = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
        <h1 className="text-4xl font-black uppercase mb-8 border-b-4 border-black pb-4">Modul Pembelajaran</h1>
        <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-a:text-primary">
          <ReactMarkdown
            components={{
              p: ({ children }) => <ParagraphWithLocalizer region={region}>{children}</ParagraphWithLocalizer>
            }}
          >
            {lessonPlan}
          </ReactMarkdown>
        </div>
      </div>

      {quiz.length > 0 && (
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">Kuis Pemahaman</h2>
          <div className="flex flex-col gap-8">
            {quiz.map((q, i) => {
              const isCorrect = answers[i] === q.answer;
              const isWrong = submitted && !isCorrect;
              return (
                <div key={i} className={`p-6 border-2 border-black ${submitted && isCorrect ? 'bg-green-100' : ''} ${isWrong ? 'bg-red-100' : ''}`}>
                  <h3 className="text-xl font-bold mb-4">{i + 1}. {q.question}</h3>
                  <div className="flex flex-col gap-3">
                    {q.options.map((opt: string, j: number) => (
                      <label key={j} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-black hover:bg-gray-100 transition-colors bg-white">
                        <input 
                          type="radio" 
                          name={`q-${i}`} 
                          value={opt}
                          disabled={submitted}
                          checked={answers[i] === opt}
                          onChange={() => setAnswers(prev => ({...prev, [i]: opt}))}
                          className="w-5 h-5 accent-black"
                        />
                        <span className="font-medium text-lg">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {submitted && (
                    <div className="mt-4 font-bold uppercase">
                      {isCorrect ? <span className="text-green-700">BENAR</span> : <span className="text-red-700">SALAH - Jawaban yang benar: {q.answer}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submitted ? (
            <button 
              onClick={handleSubmit}
              className="mt-8 w-full bg-primary text-white font-black uppercase tracking-widest py-5 border-4 border-black hover:bg-blue-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 text-xl"
            >
              KUMPULKAN JAWABAN
            </button>
          ) : (
            <div className="mt-8 p-6 bg-highlight border-4 border-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-3xl font-black uppercase">Skor Anda: {score} / {quiz.length}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
