import React from 'react';
import Hero from '@/components/home/Hero';
import WhyChoose from '@/components/home/WhyChoose';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import AboutSection from '@/components/home/AboutSection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FaqSection from '@/components/home/FaqSection';
import LocationSection from '@/components/home/LocationSection';
import BookingStepper from '@/components/booking/BookingStepper';
import { Calendar, ShieldCheck, Clock } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#0D0D0D]">
      {/* 1. Hero Section (matching visual reference) */}
      <Hero />

      {/* 2. Por que escolher o Edy (with overlapping collage) */}
      <WhyChoose />

      {/* 3. Serviços & Estilos (with diamond ornament divider 💎) */}
      <ServicesSection />

      {/* 4. Portfólio de Trabalhos (with interactive filters & Lightbox) */}
      <PortfolioSection />

      {/* 5. Sobre o Tatuador (Edy Alves story, stats, philosophy) */}
      <AboutSection />

      {/* 6. Processo em 4 passos */}
      <ProcessSection />

      {/* 7. Agendamento Direto no Site (Core Conversion Anchor) */}
      <section id="agendar" className="py-24 sm:py-32 bg-[#111111] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#E8153B] uppercase block mb-2">
              RESERVA ONLINE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
              AGENDE SUA SESSÃO COM O EDY ALVES
            </h2>
            <p className="text-[#A0A0A0] text-base leading-relaxed">
              Consulte os dias e horários livres em tempo real e envie sua ideia. Atendimento exclusivo com hora marcada em Ceilândia-DF.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-[#888]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E8153B]" />
                Material 100% Descartável
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#E8153B]" />
                Atendimento Privativo
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#E8153B]" />
                Confirmação Rápida no WhatsApp
              </span>
            </div>
          </div>

          <React.Suspense
            fallback={
              <div className="p-12 text-center text-xs text-[#888] bg-[#161616] border border-white/10">
                Carregando formulário de agendamento...
              </div>
            }
          >
            <BookingStepper />
          </React.Suspense>
        </div>
      </section>

      {/* 8. Prova Social / Depoimentos (Google Reviews) */}
      <TestimonialsSection />

      {/* 9. FAQ (Accordion) */}
      <FaqSection />

      {/* 10. Localização & Contato (Google Maps Ceilândia) */}
      <LocationSection />
    </div>
  );
}
