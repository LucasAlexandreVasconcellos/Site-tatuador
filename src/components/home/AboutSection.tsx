import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-24 sm:py-32 bg-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Portrait with Moody Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto border-2 border-white/10 overflow-hidden shadow-2xl bg-black">
              <Image
                src="/images/edy-portrait.png"
                alt="Edy Alves tatuador em Ceilândia DF"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#E8153B] uppercase block">
                  TATUADOR AUTORAL
                </span>
                <span className="font-display text-2xl font-bold text-white uppercase">
                  Edy Alves
                </span>
                <p className="text-xs text-[#B5B5B5] mt-1">
                  Atuando na arte da tatuagem desde {siteConfig.sinceYear}
                </p>
              </div>
            </div>

            {/* Red Accent Box Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-[#E8153B] text-white p-4 hidden sm:flex items-center gap-3 shadow-2xl z-10">
              <Award className="w-8 h-8 text-white shrink-0" />
              <div>
                <span className="font-display text-xl font-bold leading-none block">
                  +6 ANOS
                </span>
                <span className="text-[10px] tracking-wider uppercase font-medium">
                  DE EXPERIÊNCIA EM DF
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Story, Philosophy & Stats */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#E8153B] uppercase mb-2">
              HISTÓRIA & FILOSOFIA
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight mb-6">
              ARTE COM IDENTIDADE, TÉCNICA E RESPEITO À PELE
            </h2>

            <div className="space-y-4 text-[#A0A0A0] text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Meu nome é <strong className="text-white">Edy Alves</strong>. Comecei minha trajetória profissional na tatuagem em <strong className="text-white">2018</strong> com o propósito de entregar muito mais do que pigmento sob a pele: entregar uma experiência de confiança, respeito e arte duradoura.
              </p>
              <p>
                Ao longo dos anos, especializei meu traço nos estilos <strong className="text-white">Black Work</strong> e <strong className="text-white">Preto e Cinza</strong>, além de executar projetos florais, geométricos e coberturas (cover-up). Minha obsessão é pela linha consistente, pelo contraste sólido que não se esvai com o tempo e pela cicatrização saudável.
              </p>
              <p>
                No meu estúdio em Ceilândia, cada cliente é recebido em um ambiente climatizado, privativo e com normas hospitalares de biossegurança. Aqui, seu projeto não é uma linha de montagem: é tratado com a dedicação e o tempo que uma marca definitiva merece.
              </p>
            </div>

            {/* Numerical Stats Bar (Real editables) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full py-6 border-y border-white/10 mb-8">
              {siteConfig.stats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-white block">
                    {stat.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#777] block mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/agendar"
                className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-8 py-3.5"
              >
                <Calendar className="w-4 h-4" />
                <span>AGENDAR COM O EDY</span>
              </Link>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto text-xs sm:text-sm px-8 py-3.5 flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-white/80" />
                <span>TIRAR DÚVIDA DIRETO</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
