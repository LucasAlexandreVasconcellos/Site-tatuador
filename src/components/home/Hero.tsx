import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, ShieldCheck, Clock, Award } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#0D0D0D]">
      {/* Background with Dark Atmospheric Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-tattoo-bg.jpg"
          alt="Edy Alves Tattoo Studio ambiente"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 mix-blend-luminosity scale-105 animate-in fade-in duration-1000"
        />
        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-[#0D0D0D]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0D0D0D_85%)]" />
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
      </div>

      {/* Main Hero Content (Centered, Impactful) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto flex flex-col items-center">
        {/* Emblem Badge / Tattoo Studio Logo Header */}
        <div className="inline-flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-[#E8153B] mb-1">
            <span className="h-[1px] w-6 bg-[#E8153B]/60" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/80">
              ESTD. {siteConfig.sinceYear}
            </span>
            <span className="h-[1px] w-6 bg-[#E8153B]/60" />
          </div>
          <span className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-white">
            Edy Alves
          </span>
          <span className="text-xs font-display tracking-[0.35em] text-[#E8153B] uppercase font-bold mt-1">
            TATTOO STUDIO · CEILÂNDIA - DF
          </span>
        </div>

        {/* Massive Bold Uppercase Headline (matching visual reference) */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase max-w-4xl leading-[1.05] drop-shadow-xl">
          TATUAGEM AUTORAL EM <span className="text-white">BLACK WORK</span> E{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#E8153B]">
            PRETO E CINZA
          </span>{' '}
          EM BRASÍLIA-DF
        </h1>

        {/* Short Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#B5B5B5] max-w-2xl font-normal leading-relaxed">
          Traço limpo e cirúrgico, sombreamento refinado e projetos personalizados criados para a sua anatomia. Mais de 6 anos de experiência e centenas de clientes satisfeitos em Ceilândia.
        </p>

        {/* Dual CTA Buttons (Matching visual reference: Left solid red, Right outlined) */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/agendar"
            className="btn-primary w-full sm:w-auto text-sm sm:text-base px-8 py-4 shadow-xl shadow-[#E8153B]/30"
          >
            <Calendar className="w-4 h-4" />
            <span>AGENDAR SESSÃO</span>
          </Link>

          <Link
            href="#portfolio"
            className="btn-secondary w-full sm:w-auto text-sm sm:text-base px-8 py-4"
          >
            <Eye className="w-4 h-4 text-white/80" />
            <span>VER PORTFÓLIO</span>
          </Link>
        </div>

        {/* Micro-rating highlight */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#999999]">
          <span className="text-yellow-400 font-bold tracking-widest">★★★★★</span>
          <span className="text-white font-medium">5.0 no Google Avaliações</span>
          <span className="text-white/20">·</span>
          <span>Ceilândia, DF</span>
        </div>
      </div>

      {/* Trust Badges Bar (Bottom of Hero) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-10">
        <div className="border-t border-white/10 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2.5 text-xs text-[#999999]">
            <Award className="w-4 h-4 text-[#E8153B] shrink-0" />
            <span>Tatuador Profissional desde 2018</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs text-[#999999]">
            <ShieldCheck className="w-4 h-4 text-[#E8153B] shrink-0" />
            <span>Material 100% Descartável e Esterilizado</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs text-[#999999]">
            <Clock className="w-4 h-4 text-[#E8153B] shrink-0" />
            <span>Atendimento Exclusivo com Hora Marcada</span>
          </div>
        </div>
      </div>
    </section>
  );
}
