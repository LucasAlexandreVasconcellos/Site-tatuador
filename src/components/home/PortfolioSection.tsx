'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { siteConfig } from '@/config/siteConfig';
import { PortfolioItem } from '@/types';

export default function PortfolioSection() {
  const [selectedStyle, setSelectedStyle] = useState<string>('Todos');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('Todas');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const styleFilters = ['Todos', 'Black Work', 'Preto e Cinza', 'Outros'];
  const bodyPartFilters = ['Todas', 'Antebraço', 'Braço', 'Ombro'];

  const filteredItems = siteConfig.portfolio.filter((item) => {
    const styleMatch = selectedStyle === 'Todos' || item.style === selectedStyle;
    const bodyMatch = selectedBodyPart === 'Todas' || item.bodyPart.includes(selectedBodyPart);
    return styleMatch && bodyMatch;
  });

  const activeItem: PortfolioItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] || null : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
    }
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
      );
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#0D0D0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-[0.3em] text-[#E8153B] uppercase block mb-2">
            GALERIA EXCLUSIVA
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
            PORTFÓLIO DE TRABALHOS
          </h2>
          <p className="text-[#A0A0A0] text-base leading-relaxed">
            Veja algumas das tatuagens realizadas no estúdio. Clique em qualquer peça para ampliar, ver detalhes de tempo e estilo, e solicitar um projeto sob medida.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
          {/* Style Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {styleFilters.map((style) => (
              <button
                key={style}
                onClick={() => {
                  setSelectedStyle(style);
                  setLightboxIndex(null);
                }}
                className={`text-xs font-display font-bold uppercase tracking-wider px-4 py-2 transition-all ${
                  selectedStyle === style
                    ? 'bg-[#E8153B] text-white shadow-lg shadow-[#E8153B]/20'
                    : 'bg-[#161616] text-[#888888] hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Body Part Filter */}
          <div className="flex items-center gap-2 text-xs text-[#888888]">
            <span>Região:</span>
            <div className="flex gap-1">
              {bodyPartFilters.map((part) => (
                <button
                  key={part}
                  onClick={() => {
                    setSelectedBodyPart(part);
                    setLightboxIndex(null);
                  }}
                  className={`px-2.5 py-1 text-[11px] uppercase transition-colors ${
                    selectedBodyPart === part
                      ? 'text-white border-b-2 border-[#E8153B] font-bold'
                      : 'text-[#666666] hover:text-white'
                  }`}
                >
                  {part}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-[#161616] border border-white/10 hover:border-[#E8153B]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-[#E8153B]/10"
            >
              {/* Image Container with high contrast */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Vignette & Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Real Work Badge */}
                {item.isRealWork && (
                  <div className="absolute top-3 left-3 bg-[#E8153B]/90 backdrop-blur-sm text-white text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1">
                    Trabalho Real Edy Alves
                  </div>
                )}

                {/* Style Tag */}
                <div className="absolute top-3 right-3 bg-black/70 border border-white/10 text-white/80 text-[10px] uppercase tracking-wider px-2 py-0.5">
                  {item.style}
                </div>

                {/* Zoom Icon Hover Hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#E8153B]/90 text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E8153B] block mb-1">
                    {item.bodyPart} · {item.sessionTime}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#999999] line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow Bar */}
        <div className="mt-16 bg-[#161616] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shrink-0">
              <InstagramIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-white uppercase tracking-wider">
                Acompanhe os novos trabalhos no Instagram
              </h4>
              <p className="text-xs text-[#888888]">
                Postamos stories diários de sessões, desenhos exclusivos e disponibilidades de última hora.
              </p>
            </div>
          </div>

          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs px-6 py-3 shrink-0 flex items-center gap-2"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>SEGUIR {siteConfig.contact.instagram}</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal with Keyboard Navigation & Direct Booking CTA */}
      {lightboxIndex !== null && activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 z-20 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-[#E8153B] transition-colors"
            aria-label="Fechar ampliação"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-[#E8153B] transition-colors"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-[#E8153B] transition-colors"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content Box */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#161616] border border-white/15 shadow-2xl overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="relative w-full md:w-3/5 h-[340px] sm:h-[420px] md:h-[540px] bg-black">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
              />
            </div>

            {/* Info & Booking Side */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#161616]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#E8153B]">
                    {activeItem.style}
                  </span>
                  {activeItem.isRealWork && (
                    <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 uppercase tracking-wider">
                      Trabalho Real
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-3">
                  {activeItem.title}
                </h3>

                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6">
                  {activeItem.description}
                </p>

                <div className="space-y-2 py-4 border-y border-white/5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#666]">Região anatômica:</span>
                    <span className="text-white font-medium">{activeItem.bodyPart}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Tempo estimado:</span>
                    <span className="text-white font-medium">{activeItem.sessionTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Artista:</span>
                    <span className="text-white font-medium">Edy Alves</span>
                  </div>
                </div>
              </div>

              {/* Conversion CTA: "Quero algo assim" directly sends to booking with style pre-selected! */}
              <div className="pt-6">
                <Link
                  href={`/agendar?estilo=${encodeURIComponent(
                    activeItem.style.toLowerCase().replace(/\s+/g, '-')
                  )}&referencia=${encodeURIComponent(activeItem.title)}`}
                  onClick={() => setLightboxIndex(null)}
                  className="btn-primary w-full text-center text-xs py-3.5 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>QUERO ALGO ASSIM (AGENDAR)</span>
                </Link>
                <p className="text-[10px] text-center text-[#666] mt-2">
                  Você poderá enviar suas próprias referências no formulário.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
