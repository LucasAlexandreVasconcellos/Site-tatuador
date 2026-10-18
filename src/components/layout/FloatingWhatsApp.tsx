'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'click_whatsapp_floating', {
        event_category: 'contact',
        event_label: 'floating_button',
      });
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Olá Edy Alves! Vi seu site e gostaria de conversar sobre uma ideia de tatuagem e disponibilidade de horário.'
  );

  return (
    <aside aria-label="Atendimento rápido via WhatsApp" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on desktop */}
      <div className="hidden sm:flex items-center bg-[#161616] border border-white/10 text-white text-xs px-3.5 py-2 shadow-2xl rounded-sm backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse mr-2" />
        <span className="font-medium text-xs">Fale com o Edy no WhatsApp</span>
      </div>

      {/* Floating CTA */}
      <a
        href={`${siteConfig.contact.whatsappUrl}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chamar Edy Alves no WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-wa cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </aside>
  );
}
