import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Feather, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function WhyChoose() {
  return (
    <section id="diferenciais" className="py-24 sm:py-32 bg-[#0D0D0D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Features (matching visual reference) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-bold tracking-[0.25em] text-[#E8153B] uppercase mb-2">
              DIFERENCIAIS & QUALIDADE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight mb-6">
              POR QUE ESCOLHER O EDY ALVES
            </h2>
            <p className="text-[#A0A0A0] text-base leading-relaxed mb-10 max-w-xl">
              Fazer uma tatuagem é uma decisão definitiva que exige técnica apurada, respeito à sua pele e responsabilidade sanitária. Desde 2018, Edy Alves une arte personalizada e padrão técnico cirúrgico em cada atendimento em Ceilândia.
            </p>

            {/* Feature 1 */}
            <div className="space-y-8 w-full max-w-xl">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#161616] border border-white/10 group-hover:border-[#E8153B] flex items-center justify-center shrink-0 transition-colors">
                  <Feather className="w-6 h-6 text-white group-hover:text-[#E8153B] transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-1.5">
                    TRAÇO LIMPO E PRECISO
                  </h3>
                  <p className="text-sm text-[#8E8E8E] leading-relaxed">
                    Linhas consistentes, preenchimento sólido sem falhas e pontilhismo com precisão milimétrica que mantêm a definição ao longo dos anos.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#161616] border border-white/10 group-hover:border-[#E8153B] flex items-center justify-center shrink-0 transition-colors">
                  <Compass className="w-6 h-6 text-white group-hover:text-[#E8153B] transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-1.5">
                    PROJETO PERSONALIZADO E AUTORAL
                  </h3>
                  <p className="text-sm text-[#8E8E8E] leading-relaxed">
                    Não fazemos cópias genéricas da internet. Criamos composições exclusivas respeitando o fluxo muscular e o formato do seu corpo.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#161616] border border-white/10 group-hover:border-[#E8153B] flex items-center justify-center shrink-0 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-white group-hover:text-[#E8153B] transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-1.5">
                    BIOSSEGURANÇA E HIGIENE TOTAL
                  </h3>
                  <p className="text-sm text-[#8E8E8E] leading-relaxed">
                    Agulhas de cartucho descartáveis e lacradas, bancada higienizada, luvas de nitrilo e proteção total contra contaminação cruzada.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <Link
                href="#sobre"
                className="btn-primary text-xs sm:text-sm px-7 py-3.5 flex items-center gap-2"
              >
                <span>CONHECER O EDY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Overlapping Photo Collage (matching visual reference) */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <div className="relative w-full max-w-lg mx-auto h-[480px] sm:h-[540px]">
              {/* Photo 1: Upper Right / Process action photo */}
              <div className="absolute top-0 right-0 w-[68%] h-[58%] border border-white/10 overflow-hidden shadow-2xl z-10 group">
                <Image
                  src="/images/edy-action.png"
                  alt="Edy Alves tatuando cliente no estúdio em Ceilândia"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-display uppercase tracking-wider text-white/90">
                  Precisão em cada sessão
                </div>
              </div>

              {/* Photo 2: Lower Left / Portrait of Edy Alves overlapping Photo 1 */}
              <div className="absolute bottom-0 left-0 w-[72%] h-[74%] border-2 border-white/15 overflow-hidden shadow-2xl z-20 group">
                <Image
                  src="/images/edy-portrait.png"
                  alt="Foto de Edy Alves tatuador profissional"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#E8153B] uppercase block">
                    TATUADOR OFICIAL
                  </span>
                  <span className="font-display text-lg font-bold text-white uppercase">
                    Edy Alves
                  </span>
                  <p className="text-xs text-[#B5B5B5]">
                    Atendendo em Ceilândia desde {siteConfig.sinceYear}
                  </p>
                </div>
              </div>

              {/* Decorative Accent Graphic Elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#E8153B]/20 pointer-events-none z-0" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#E8153B]/5 pointer-events-none z-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
