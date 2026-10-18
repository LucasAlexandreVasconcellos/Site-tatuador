import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export const metadata: Metadata = {
  title: 'Política de Privacidade (LGPD) | Edy Alves Tattoo',
  description: 'Política de privacidade e proteção de dados do estúdio Edy Alves Tattoo em conformidade com a LGPD.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#CCCCCC] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-wider text-[#888] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>

        <div className="bg-[#161616] border border-white/10 p-8 sm:p-12 space-y-8">
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <Shield className="w-8 h-8 text-[#E8153B]" />
            <div>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white uppercase">
                POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS
              </h1>
              <p className="text-xs text-[#888] mt-1">
                Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#A0A0A0] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">1. Quem Somos</h2>
              <p>
                O estúdio <strong>{siteConfig.name}</strong>, sob responsabilidade do tatuador Edy Alves, localizado em Ceilândia, Brasília - DF, é o controlador dos dados pessoais coletados por meio deste website.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">2. Dados Coletados e Finalidade</h2>
              <p>
                Coletamos apenas os dados estritamente necessários para viabilizar o agendamento e atendimento da sua sessão de tatuagem:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Nome completo:</strong> para identificação do cliente na ficha de atendimento;</li>
                <li><strong>Número de WhatsApp / Telefone:</strong> para confirmação de horário, envio de orçamentos e orientações pré e pós-tatuagem;</li>
                <li><strong>Data de nascimento:</strong> para verificação obrigatória de maioridade legal (18 anos);</li>
                <li><strong>E-mail (opcional):</strong> para envio de comprovantes ou notificações;</li>
                <li><strong>Imagens de referência e descrição da ideia:</strong> para estudo prévio e composição artística do projeto.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">3. Não Compartilhamento</h2>
              <p>
                Os seus dados <strong>jamais serão vendidos, alugados ou compartilhados com terceiros</strong> para fins publicitários ou comerciais. O acesso é restrito unicamente ao tatuador Edy Alves.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">4. Armazenamento Seguro</h2>
              <p>
                Os dados são armazenados em servidores seguros com controle de acesso protegido por autenticação. O titular pode solicitar a exclusão ou alteração de seus dados a qualquer momento entrando em contato pelo WhatsApp oficial <strong>{siteConfig.contact.phone}</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">5. Cookies de Navegação</h2>
              <p>
                Utilizamos cookies essenciais para manter o funcionamento adequado do site (como preferências de consentimento) e cookies analíticos anônimos para entender o fluxo de visitas.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
