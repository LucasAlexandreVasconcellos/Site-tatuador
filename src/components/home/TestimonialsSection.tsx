import React from 'react';
import { Star, MessageSquare, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 sm:py-32 bg-[#111111] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161616] border border-white/10 text-xs text-white/90 uppercase tracking-widest font-semibold mb-3">
            <span className="text-yellow-400">★★★★★</span>
            <span>5.0 de Avaliação no Google</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
            PROVA SOCIAL & AVALIAÇÕES REAIS
          </h2>
          <p className="text-[#A0A0A0] text-base leading-relaxed">
            A opinião de quem já confiou na agulha e no traço do Edy Alves em Ceilândia.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {siteConfig.testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-[#161616] border border-white/10 p-7 sm:p-8 flex flex-col justify-between relative group hover:border-[#E8153B]/40 transition-colors"
            >
              <div>
                {/* Header of Card: Rating Stars & Google badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#666]">
                    Google Maps
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-[#CCCCCC] leading-relaxed italic mb-6">
                  &ldquo;{test.comment}&rdquo;
                </p>
              </div>

              {/* Author & Piece Description */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    {test.clientName}
                  </h3>
                  <span className="text-[11px] text-[#777] block">
                    {test.tattooDescription}
                  </span>
                </div>
                <span className="text-[10px] text-[#555]">{test.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA Badge */}
        <div className="bg-[#161616] border border-white/10 p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#E8153B] shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-white uppercase tracking-wider">
                Já tatuou com o Edy Alves?
              </h4>
              <p className="text-xs text-[#888888]">
                Sua avaliação nos ajuda a crescer e ajuda novos clientes a conhecerem a qualidade do trabalho.
              </p>
            </div>
          </div>

          <a
            href={siteConfig.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs px-6 py-3.5 shrink-0 flex items-center gap-2"
          >
            <span>AVALIAR NO GOOGLE MAPS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
