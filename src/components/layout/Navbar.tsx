'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar, Phone, MapPin } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { siteConfig } from '@/config/siteConfig';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '/#' },
    { label: 'Por que o Edy', href: '/#diferenciais' },
    { label: 'Serviços', href: '/#servicos' },
    { label: 'Portfólio', href: '/#portfolio' },
    { label: 'Sobre', href: '/#sobre' },
    { label: 'Processo', href: '/#processo' },
    { label: 'Depoimentos', href: '/#depoimentos' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Localização', href: '/#contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-[#E8153B] flex items-center justify-center font-display font-black text-white text-lg tracking-tighter transform group-hover:scale-105 transition-transform">
            EA
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white uppercase group-hover:text-[#E8153B] transition-colors leading-tight">
              EDY ALVES
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#B5B5B5] font-semibold uppercase -mt-0.5">
              TATTOO STUDIO · DF
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs uppercase font-medium tracking-wider text-[#B5B5B5] hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E8153B] hover:after:w-full after:transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Quick Contacts */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do Edy Alves Tattoo"
            className="text-[#B5B5B5] hover:text-white transition-colors p-2"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <Link
            href="/agendar"
            className="btn-primary text-xs tracking-widest px-5 py-2.5 shadow-lg shadow-[#E8153B]/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>AGENDAR</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/agendar"
            className="bg-[#E8153B] text-white font-display text-xs font-bold tracking-wider px-3.5 py-2 uppercase"
          >
            AGENDAR
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:text-[#E8153B] focus:outline-none transition-colors"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-full bg-[#0D0D0D]/98 border-b border-white/10 backdrop-blur-xl px-5 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-wider text-[#B5B5B5] hover:text-white py-2 border-b border-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#E8153B] text-xs">→</span>
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/agendar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full text-center text-sm py-3 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>AGENDAR SESSÃO ONLINE</span>
              </Link>

              <div className="flex items-center justify-between pt-2 text-xs text-[#888]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E8153B]" />
                  Ceilândia, Brasília - DF
                </span>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-white hover:text-[#25D366]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  (61) 98279-1299
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
