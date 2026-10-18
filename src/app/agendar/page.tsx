'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Calendar, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import BookingStepper from '@/components/booking/BookingStepper';
import { ServiceType, TattooStyle } from '@/types';

function BookingFormWithParams() {
  const searchParams = useSearchParams();
  const service = (searchParams.get('servico') || undefined) as ServiceType | undefined;
  const style = (searchParams.get('estilo') || undefined) as TattooStyle | undefined;
  const reference = searchParams.get('referencia') || undefined;

  return (
    <BookingStepper
      initialService={service}
      initialStyle={style}
      initialReference={reference}
    />
  );
}

export default function AgendarPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#CCCCCC] pt-28 pb-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-wider text-[#888] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.3em] text-[#E8153B] uppercase block mb-2">
            ATENDIMENTO COM HORA MARCADA
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-4">
            SOLICITAÇÃO DE AGENDAMENTO
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
            Preencha os dados abaixo em 5 passos simples para reservar seu horário com Edy Alves no estúdio em Ceilândia, Brasília-DF.
          </p>

          {/* Quick Trust Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-[#888]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#E8153B]" />
              Material 100% Descartável
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E8153B]" />
              Horário Exclusivo
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#E8153B]" />
              Confirmação via WhatsApp
            </span>
          </div>
        </div>

        {/* The Stepper Engine inside Suspense boundary */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-xs text-[#888] bg-[#161616] border border-white/10">
              Carregando calendário de agendamento...
            </div>
          }
        >
          <BookingFormWithParams />
        </Suspense>
      </div>
    </div>
  );
}
