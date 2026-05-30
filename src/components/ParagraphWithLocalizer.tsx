"use client";
import React, { useState } from 'react';

export function ParagraphWithLocalizer({ children, region }: { children: React.ReactNode, region: string }) {
  const [localizedText, setLocalizedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getTextContent = (node: React.ReactNode): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (React.isValidElement(node)) {
      return getTextContent((node as React.ReactElement<any>).props.children);
    }
    return '';
  };

  const text = getTextContent(children).trim();

  const handleLocalize = async () => {
    if (!text || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/localize-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textSnippet: text, region })
      });
      const data = await res.json();
      setLocalizedText(data.localizedText);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 border-l-4 border-black pl-4 py-2 relative group">
      <p className="inline text-lg leading-relaxed">{children}</p>
      {text.length > 30 && (
        <button
          onClick={handleLocalize}
          disabled={loading}
          className="ml-3 inline-block px-3 py-1 text-sm bg-primary text-white font-bold uppercase border-2 border-black hover:bg-blue-800 disabled:bg-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          {loading ? 'MEMPROSES...' : 'BANTU PAHAM (LOKALISASI)'}
        </button>
      )}
      {localizedText && (
        <div className="mt-4 p-4 bg-highlight border-2 border-black text-base font-medium text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <strong className="uppercase font-black text-lg block border-b-2 border-black pb-2 mb-2">ANALOGI LOKAL ({region}):</strong> 
          {localizedText}
        </div>
      )}
    </div>
  );
}
