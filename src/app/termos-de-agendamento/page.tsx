import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export const metadata: Metadata = {
  title: 'Termos e Regras de Agendamento | Edy Alves Tattoo',
  description: 'Regras de agendamento, pagamento de sinal, cancelamento e orientações de saúde do estúdio Edy Alves Tattoo.',
};

export default function TermosAgendamentoPage() {
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
            <FileText className="w-8 h-8 text-[#E8153B]" />
            <div>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white uppercase">
                TERMOS E REGRAS DE AGENDAMENTO
              </h1>
              <p className="text-xs text-[#888] mt-1">
                Orientações para garantir a melhor experiência na sua sessão com Edy Alves
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#A0A0A0] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">
                1. Sinal de Reserva de Horário
              </h2>
              <p>
                Para confirmar a data e horário reservados, é exigido o pagamento de um sinal de reserva ({siteConfig.defaultSettings.depositAmount}). Este valor é integralmente abatido do valor total da tatuagem no dia da sessão.
              </p>
              <p>
                O horário permanece com status pré-reservado até o envio do comprovante pelo WhatsApp em até 24 horas após a solicitação.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">
                2. Política de Remarcação e Cancelamento
              </h2>
              <p>
                Entendemos que imprevistos acontecem. Você pode remarcar sua sessão <strong>uma única vez mantendo o valor do sinal</strong>, desde que avise com antecedência mínima de <strong>48 horas</strong> antes do horário agendado.
              </p>
              <p>
                Cancelamentos com menos de 48 horas de antecedência ou não comparecimento (no-show) resultam na perda do sinal, destinado a cobrir o tempo de estúdio reservado.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">
                3. Idade Mínima e Documentação
              </h2>
              <p>
                É expressamente proibido tatuar menores de 18 anos desacompanhados. É obrigatória a apresentação de documento oficial com foto (RG, CNH ou Passaporte físico ou digital oficial) no dia da sessão.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white uppercase">
                4. Saúde e Cuidados no Dia da Sessão
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Alimente-se bem antes de comparecer ao estúdio;</li>
                <li>Não consuma bebidas alcoólicas nas 24h anteriores ao procedimento;</li>
                <li>Não compareça sob efeito de substâncias entorpecentes;</li>
                <li>Comunique previamente caso possua alergias a pigmentos, látex ou restrições dermatológicas.</li>
              </ul>
            </section>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-[#777]">
              Dúvidas? Entre em contato pelo WhatsApp oficial: {siteConfig.contact.phone}
            </span>
            <Link href="/agendar" className="btn-primary text-xs px-6 py-3">
              IR PARA O AGENDAMENTO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
