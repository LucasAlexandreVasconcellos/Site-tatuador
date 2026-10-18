import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { siteConfig } from '@/config/siteConfig';

export default function LocationSection() {
  return (
    <section id="contato" className="py-24 sm:py-32 bg-[#111111] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Contact & Studio Information */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#E8153B] uppercase mb-2">
              ONDE ESTAMOS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight mb-6">
              LOCALIZAÇÃO & ATENDIMENTO
            </h2>
            <p className="text-[#A0A0A0] text-base leading-relaxed mb-8">
              O estúdio está localizado em <strong className="text-white">Ceilândia, Brasília-DF</strong>. Um espaço privado, seguro e estruturado para você ter todo o conforto durante sua sessão.
            </p>

            <div className="space-y-6 w-full mb-10">
              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#161616] border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#E8153B]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Endereço
                  </h3>
                  <p className="text-sm text-[#888888]">
                    {siteConfig.contact.address.formatted}
                  </p>
                  <p className="text-xs text-[#666666] mt-0.5">
                    Fácil acesso, próximo a pontos de referência em Ceilândia.
                  </p>
                </div>
              </div>

              {/* Hours item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#161616] border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#E8153B]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Horário de Funcionamento
                  </h3>
                  <p className="text-sm text-[#888888]">
                    {siteConfig.contact.openingHours}
                  </p>
                  <p className="text-xs text-[#E8153B] mt-0.5 font-medium">
                    * Sessões somente com hora marcada prévia.
                  </p>
                </div>
              </div>

              {/* WhatsApp item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#161616] border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1">
                    WhatsApp Direto
                  </h3>
                  <p className="text-sm text-[#888888]">
                    {siteConfig.contact.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 w-full">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs px-6 py-3.5 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>CHAMAR NO WHATSAPP</span>
              </a>

              <a
                href={siteConfig.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs px-6 py-3.5 flex items-center gap-2"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>COMO CHEGAR (ROTAS)</span>
              </a>

              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs px-5 py-3.5 flex items-center gap-2"
              >
                <InstagramIcon className="w-4 h-4 text-[#E8153B]" />
                <span>INSTAGRAM</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Google Map & Visual Frame */}
          <div className="lg:col-span-7">
            <div className="bg-[#161616] border border-white/15 p-2 sm:p-3 relative shadow-2xl overflow-hidden group">
              {/* Google Map Iframe */}
              <div className="relative w-full h-[380px] sm:h-[460px] bg-black">
                <iframe
                  title="Localização de Edy Alves Tattoo no Google Maps em Ceilândia DF"
                  src={siteConfig.contact.googleMapsEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Map floating card */}
              <div className="p-4 bg-[#161616] border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8153B] animate-ping" />
                  <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                    EDY ALVES TATTOO · CEILÂNDIA
                  </span>
                </div>
                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#E8153B] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Abrir no app Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
