import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, ShieldCheck, Lock } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { siteConfig } from '@/config/siteConfig';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#080808] border-t border-white/10 text-[#888888] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Column 1: Brand & Bio */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#E8153B] flex items-center justify-center font-display font-black text-white text-base">
                EA
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-white uppercase">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#999999]">
              Estúdio especializado em tatuagens autorais de alto padrão em Black Work e Preto e Cinza. Biossegurança rigorosa e atendimento exclusivo em Ceilândia, Brasília-DF.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E8153B] font-semibold tracking-wider uppercase pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Tatuador Profissional desde {siteConfig.sinceYear}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase mb-2">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#" className="hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#diferenciais" className="hover:text-white transition-colors">
                  Diferenciais do Edy
                </Link>
              </li>
              <li>
                <Link href="/#servicos" className="hover:text-white transition-colors">
                  Serviços & Estilos
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-white transition-colors">
                  Galeria de Trabalhos
                </Link>
              </li>
              <li>
                <Link href="/#sobre" className="hover:text-white transition-colors">
                  Sobre o Tatuador
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Dúvidas Frequentes (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/agendar" className="text-[#E8153B] font-semibold hover:underline">
                  Agendar Sessão Online →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase mb-2">
              Contato & Horários
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8153B] shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.address.formatted}
                  <br />
                  <a
                    href={siteConfig.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#E8153B] hover:underline"
                  >
                    Ver no Google Maps ↗
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8153B] shrink-0" />
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#E8153B] shrink-0" />
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.instagram}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E8153B] shrink-0 mt-0.5" />
                <span className="text-xs">
                  {siteConfig.contact.openingHours}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Booking & Trust */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase mb-2">
              Atendimento com Hora Marcada
            </h3>
            <p className="text-xs text-[#999999] leading-relaxed">
              Para garantir a máxima dedicação e exclusividade em cada projeto, todo atendimento é realizado sob agendamento prévio.
            </p>
            <div className="pt-2">
              <Link
                href="/agendar"
                className="btn-primary w-full text-center text-xs py-3"
              >
                SOLICITAR HORÁRIO ONLINE
              </Link>
            </div>
            <p className="text-[11px] text-[#666666] pt-1">
              ✓ Materiais 100% descartáveis e esterilizados em autoclave.
            </p>
          </div>
        </div>

        {/* Bottom Bar & LGPD */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados. Ceilândia, Brasília - DF.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/politica-de-privacidade"
              className="hover:text-white transition-colors"
            >
              Política de Privacidade (LGPD)
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/termos-de-agendamento"
              className="hover:text-white transition-colors"
            >
              Termos de Agendamento
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-[#666666] hover:text-[#E8153B] transition-colors"
              title="Acesso Administrativo"
            >
              <Lock className="w-3 h-3" />
              <span>Painel do Edy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
