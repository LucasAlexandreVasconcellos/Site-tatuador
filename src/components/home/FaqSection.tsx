'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(siteConfig.faq[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#0D0D0D] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#E8153B] uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>TIRA-DÚVIDAS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
            PERGUNTAS FREQUENTES (FAQ)
          </h2>
          <p className="text-[#A0A0A0] text-base leading-relaxed">
            Tire todas as suas dúvidas sobre o processo, biossegurança, valores e como cuidar da sua arte.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {siteConfig.faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#161616] border border-white/10 transition-colors duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 group focus:outline-none focus:ring-1 focus:ring-[#E8153B]"
                >
                  <span className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wide group-hover:text-[#E8153B] transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#E8153B] text-white' : 'text-[#888]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm text-[#A0A0A0] leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct question box */}
        <div className="mt-12 text-center text-xs text-[#777]">
          Tem alguma dúvida que não está aqui?{' '}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8153B] font-bold hover:underline ml-1"
          >
            Fale direto com o Edy no WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
