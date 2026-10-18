import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function ProcessSection() {
  return (
    <section id="processo" className="py-24 sm:py-32 bg-[#0D0D0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-[0.3em] text-[#E8153B] uppercase block mb-2">
            PASSO A PASSO
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
            COMO FUNCIONA O SEU AGENDAMENTO
          </h2>
          <p className="text-[#A0A0A0] text-base leading-relaxed">
            Um fluxo transparente e organizado para você ter total segurança desde a concepção da ideia até a cicatrização final.
          </p>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {siteConfig.timeline.map((step, idx) => (
            <div
              key={step.step}
              className="bg-[#161616] border border-white/10 hover:border-[#E8153B]/50 p-7 sm:p-8 flex flex-col justify-between relative group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Step Big Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-4xl sm:text-5xl font-black text-white/15 group-hover:text-[#E8153B] transition-colors">
                    {step.step}
                  </span>
                  <span className="w-2.5 h-2.5 bg-[#E8153B] rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Step Title */}
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-3 leading-snug">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-[#8E8E8E] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#666]">
                <span>Etapa {idx + 1} de 4</span>
                <span className="text-[#E8153B]">✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-16 text-center">
          <Link
            href="/agendar"
            className="btn-primary text-xs sm:text-sm px-8 py-4 shadow-xl shadow-[#E8153B]/20"
          >
            <Calendar className="w-4 h-4" />
            <span>INICIAR MEU AGENDAMENTO AGORA</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
