'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('edy_tattoo_lgpd_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('edy_tattoo_lgpd_consent', 'accepted');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de Privacidade e Cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-[#161616]/95 border border-white/10 backdrop-blur-xl p-4 sm:p-5 shadow-2xl text-xs rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#E8153B] shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <p className="text-white font-medium">Privacidade e Proteção de Dados (LGPD)</p>
          <p className="text-[#A0A0A0] leading-relaxed">
            Utilizamos cookies essenciais e recursos de análise para proporcionar a melhor experiência de navegação e garantir a segurança do seu agendamento, em conformidade com a LGPD (Lei 13.709/2018).
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleAccept}
              className="bg-[#E8153B] hover:bg-[#C90F31] text-white font-display text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 transition-colors"
            >
              Concordar e Fechar
            </button>
            <Link
              href="/politica-de-privacidade"
              className="text-[#B5B5B5] hover:text-white underline underline-offset-2 transition-colors"
            >
              Saiba mais
            </Link>
          </div>
        </div>
        <button
          onClick={handleAccept}
          className="text-[#666] hover:text-white p-1 transition-colors"
          aria-label="Fechar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
