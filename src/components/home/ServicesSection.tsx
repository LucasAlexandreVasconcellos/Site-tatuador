import React from 'react';
import Link from 'next/link';
import { PenTool, Sparkles, Layers, RotateCcw, Calendar, Eye } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return <PenTool className="w-8 h-8 text-white group-hover:text-[#E8153B] transition-colors" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-white group-hover:text-[#E8153B] transition-colors" />;
      case 'Layers':
        return <Layers className="w-8 h-8 text-white group-hover:text-[#E8153B] transition-colors" />;
      case 'RotateCcw':
        return <RotateCcw className="w-8 h-8 text-white group-hover:text-[#E8153B] transition-colors" />;
      default:
        return <PenTool className="w-8 h-8 text-white group-hover:text-[#E8153B] transition-colors" />;
    }
  };

  return (
    <section id="servicos" className="py-24 sm:py-32 bg-[#111111] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Diamond Ornament Divider (Exact match with visual reference) */}
        <div className="inline-flex flex-col items-center mb-4">
          <div className="w-7 h-7 rotate-45 border-2 border-white/30 flex items-center justify-center mb-2">
            <div className="w-2.5 h-2.5 bg-[#E8153B]" />
          </div>
          <span className="text-[11px] font-bold tracking-[0.3em] text-[#E8153B] uppercase">
            ESPECIALIDADES
          </span>
        </div>

        {/* Section Title & Subtitle */}
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
          NOSSOS SERVIÇOS & ESTILOS
        </h2>
        <p className="text-[#999999] text-base max-w-2xl mx-auto mb-16 leading-relaxed">
          Técnicas aprimoradas para entregar o mais alto contraste, fidelidade e durabilidade. Cada sessão é personalizada para você.
        </p>

        {/* 4 Cards Grid (Matching visual reference: #161616 card, 1px border, outline icon, title, description, starting price) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
          {siteConfig.services.map((service) => (
            <div
              key={service.id}
              className="bg-[#161616] border border-white/10 hover:border-[#E8153B]/50 p-7 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#E8153B]/10"
            >
              <div>
                {/* Outline Icon */}
                <div className="mb-6 p-3 bg-black/40 inline-flex items-center justify-center border border-white/5">
                  {getIcon(service.iconName)}
                </div>

                {/* Service Name */}
                <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase mb-3 group-hover:text-[#E8153B] transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#888888] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Price & Duration */}
              <div className="pt-6 border-t border-white/5">
                <span className="text-[11px] uppercase tracking-wider text-[#666666] block mb-1">
                  Investimento estimado
                </span>
                <span className="font-display text-lg font-bold text-white tracking-wide block">
                  {service.startingPrice}
                </span>
                <span className="text-[11px] text-[#888888] block mt-1">
                  ⏱ {service.durationApprox}
                </span>

                <Link
                  href={`/agendar?servico=${service.slug}`}
                  className="mt-5 w-full text-center text-xs font-display uppercase tracking-widest font-bold py-2.5 border border-white/10 group-hover:border-[#E8153B] group-hover:bg-[#E8153B] group-hover:text-white transition-all block text-[#B5B5B5]"
                >
                  Agendar este estilo
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Center CTA Buttons (Matching visual reference) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/agendar"
            className="btn-primary w-full sm:w-auto text-sm px-8 py-3.5 shadow-xl shadow-[#E8153B]/20"
          >
            <Calendar className="w-4 h-4" />
            <span>AGENDAR AGORA</span>
          </Link>

          <Link
            href="#portfolio"
            className="btn-secondary w-full sm:w-auto text-sm px-8 py-3.5"
          >
            <Eye className="w-4 h-4 text-white/80" />
            <span>VER TRABALHOS NO PORTFÓLIO</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
