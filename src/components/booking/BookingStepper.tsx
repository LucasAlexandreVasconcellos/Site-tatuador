'use client';

import React, { useState, useEffect, useId } from 'react';
import Image from 'next/image';
import {
  Calendar as CalendarIcon,
  Clock,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Copy,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { ServiceType, TattooStyle, TattooSize, Appointment } from '@/types';

interface BookingStepperProps {
  initialService?: ServiceType;
  initialStyle?: TattooStyle;
  initialReference?: string;
}

export default function BookingStepper({
  initialService,
  initialStyle,
  initialReference,
}: BookingStepperProps) {
  const fileUploadId = useId();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  // Form State
  const [serviceType, setServiceType] = useState<ServiceType>(initialService || 'tatuagem-nova');
  const [style, setStyle] = useState<TattooStyle>(initialStyle || 'blackwork');
  const [bodyPart, setBodyPart] = useState('Antebraço');
  const [size, setSize] = useState<TattooSize>('medio');
  const [sizeCustomCm, setSizeCustomCm] = useState('');
  const [description, setDescription] = useState(initialReference ? `Inspiração: ${initialReference}` : '');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);

  // Step 3: Date & Time
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<{ date: string; timeSlot: string }[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [availableHours, setAvailableHours] = useState<string[]>(siteConfig.defaultSettings.workingHours);

  // Step 4: Client Info
  const [clientName, setClientName] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam

  // Fetch booked slots and studio availability
  useEffect(() => {
    async function loadAvailability() {
      try {
        const res = await fetch('/api/appointments');
        if (res.ok) {
          const data = await res.json();
          if (data.bookedSlots) setBookedSlots(data.bookedSlots);
          if (data.settings) {
            setBlockedDates(data.settings.blockedDates || []);
            setAvailableHours(data.settings.workingHours || siteConfig.defaultSettings.workingHours);
          }
        }
      } catch (err) {
        console.warn('Using local availability fallback', err);
      }
    }
    loadAvailability();
  }, []);

  // WhatsApp phone masking helper
  const handlePhoneChange = (val: string) => {
    let raw = val.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);
    
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    }
    if (raw.length > 7) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    }
    setClientWhatsapp(formatted);
  };

  // Image upload handler (base64, max 5 images, max 4MB each)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setErrorMsg(null);

    if (referenceImages.length + files.length > 5) {
      setErrorMsg('Você pode anexar no máximo 5 imagens de referência.');
      return;
    }

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Por favor, selecione apenas arquivos de imagem válidos.');
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        setErrorMsg('Cada imagem deve ter no máximo 4MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Validate age (+18 check)
  const validateAge = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const birth = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 18;
  };

  // Step 1 Validation
  const handleNextStep1 = () => {
    setErrorMsg(null);
    setCurrentStep(2);
  };

  // Step 2 Validation
  const handleNextStep2 = () => {
    setErrorMsg(null);
    if (!description.trim() || description.trim().length < 5) {
      setErrorMsg('Por favor, conte um pouco sobre sua ideia para a tatuagem.');
      return;
    }
    setCurrentStep(3);
  };

  // Step 3 Validation
  const handleNextStep3 = () => {
    setErrorMsg(null);
    if (!selectedDate) {
      setErrorMsg('Por favor, escolha uma data disponível no calendário.');
      return;
    }
    if (!selectedTimeSlot) {
      setErrorMsg('Por favor, escolha um dos horários disponíveis.');
      return;
    }
    setCurrentStep(4);
  };

  // Step 4 Validation & Submission
  const handleSubmitBooking = async () => {
    setErrorMsg(null);

    // Spam honeypot
    if (honeypot) return;

    if (!clientName.trim() || clientName.trim().length < 3) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }

    const cleanPhone = clientWhatsapp.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Por favor, informe um número de WhatsApp válido com DDD.');
      return;
    }

    if (!birthDate) {
      setErrorMsg('Por favor, informe sua data de nascimento.');
      return;
    }

    if (!validateAge(birthDate)) {
      setErrorMsg('É necessário ter pelo menos 18 anos completos para agendar sem autorização presencial dos responsáveis.');
      return;
    }

    if (!lgpdAccepted) {
      setErrorMsg('Você precisa concordar com os termos de privacidade para continuar.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg('Você precisa confirmar a leitura das regras de agendamento e sinal.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        serviceType,
        style,
        bodyPart,
        size,
        sizeCustomCm,
        description,
        referenceImages,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        clientName,
        clientWhatsapp,
        clientEmail,
        birthDate,
        lgpdAccepted,
        termsAccepted,
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao processar sua solicitação.');
      }

      setCreatedAppointment(data.appointment);
      setCurrentStep(5);

      // Track event
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'generate_lead', {
          event_category: 'booking',
          event_label: serviceType,
        });
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Falha ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for WhatsApp confirmation message
  const generateWhatsAppMessage = () => {
    if (!createdAppointment) return '';
    const text = `*SOLICITAÇÃO DE AGENDAMENTO - EDY ALVES TATTOO*
──────────────────────
📌 *Código:* ${createdAppointment.id}
👤 *Cliente:* ${createdAppointment.clientName}
📱 *WhatsApp:* ${createdAppointment.clientWhatsapp}
📅 *Data Solicitada:* ${new Date(createdAppointment.date + 'T12:00:00').toLocaleDateString('pt-BR')} às ${createdAppointment.timeSlot}
🎨 *Estilo:* ${createdAppointment.style.toUpperCase()}
📍 *Região do corpo:* ${createdAppointment.bodyPart}
📐 *Tamanho:* ${createdAppointment.size.toUpperCase()} ${createdAppointment.sizeCustomCm ? `(${createdAppointment.sizeCustomCm})` : ''}
💡 *Ideia:* ${createdAppointment.description}
${createdAppointment.referenceImages.length > 0 ? `🖼️ *Imagens de referência:* ${createdAppointment.referenceImages.length} anexo(s) enviado(s)` : ''}
──────────────────────
_Olá Edy! Enviei minha solicitação pelo site e aguardo a confirmação do horário e os detalhes do sinal._`;

    return encodeURIComponent(text);
  };

  // Copy PIX key helper
  const handleCopyPix = () => {
    navigator.clipboard.writeText(siteConfig.defaultSettings.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  // Available days state generated inside useEffect to avoid prerendering timing errors
  const [availableDays, setAvailableDays] = useState<
    Array<{ dateStr: string; dayNumber: number; monthShort: string; weekdayShort: string }>
  >([]);

  useEffect(() => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 21; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();
      const dateStr = d.toISOString().split('T')[0];

      const isWorkingDay = siteConfig.defaultSettings.workingDays.includes(dayOfWeek);
      const isBlocked = blockedDates.includes(dateStr);

      if (isWorkingDay && !isBlocked) {
        days.push({
          dateStr,
          dayNumber: d.getDate(),
          monthShort: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
          weekdayShort: d.toLocaleDateString('pt-BR', { weekday: 'short' }),
        });
      }
    }
    setAvailableDays(days);
  }, [blockedDates]);

  // Check if a time slot on a specific date is booked
  const isTimeSlotBooked = (date: string, slot: string) => {
    return bookedSlots.some((b) => b.date === date && b.timeSlot === slot);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161616] border border-white/10 p-6 sm:p-10 shadow-2xl relative">
      {/* Honeypot field for anti-spam bots */}
      <input
        type="text"
        name="website_url_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Stepper Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-display uppercase tracking-widest text-[#888] mb-3">
          <span className={currentStep >= 1 ? 'text-[#E8153B] font-bold' : ''}>1. Serviço</span>
          <span className={currentStep >= 2 ? 'text-[#E8153B] font-bold' : ''}>2. A Ideia</span>
          <span className={currentStep >= 3 ? 'text-[#E8153B] font-bold' : ''}>3. Data & Hora</span>
          <span className={currentStep >= 4 ? 'text-[#E8153B] font-bold' : ''}>4. Seus Dados</span>
          <span className={currentStep === 5 ? 'text-[#E8153B] font-bold' : ''}>5. Conclusão</span>
        </div>
        <div className="w-full h-1.5 bg-black/60 overflow-hidden">
          <div
            className="h-full bg-[#E8153B] transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-950/60 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 1: TIPO DE SERVIÇO
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E8153B] uppercase block mb-1">
              ETAPA 01 DE 05
            </span>
            <h3 className="font-display text-2xl font-bold text-white uppercase">
              SELECIONE O TIPO DE ATENDIMENTO
            </h3>
            <p className="text-xs text-[#888] mt-1">
              Escolha a modalidade que melhor descreve o projeto que você deseja realizar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'tatuagem-nova',
                title: 'Tatuagem Nova (Autoral / Flash)',
                desc: 'Projeto novo a ser desenvolvido ou reproduzido na sua pele.',
              },
              {
                id: 'cover-up',
                title: 'Cobertura (Cover-up) / Reforma',
                desc: 'Cobrir ou transformar uma tatuagem antiga que você deseja camuflar.',
              },
              {
                id: 'retoque',
                title: 'Retoque / Manutenção',
                desc: 'Revitalização de pigmentação de arte já existente.',
              },
              {
                id: 'projeto-exclusivo',
                title: 'Fechamento / Projeto Exclusivo',
                desc: 'Fechamento completo de braço, perna, costas ou composição autoral grande.',
              },
            ].map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setServiceType(srv.id as ServiceType)}
                className={`text-left p-5 border transition-all ${
                  serviceType === srv.id
                    ? 'border-[#E8153B] bg-[#E8153B]/10 shadow-lg shadow-[#E8153B]/10'
                    : 'border-white/10 bg-black/40 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-base font-bold text-white uppercase">
                    {srv.title}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      serviceType === srv.id
                        ? 'border-[#E8153B] bg-[#E8153B]'
                        : 'border-white/30'
                    }`}
                  >
                    {serviceType === srv.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </div>
                <p className="text-xs text-[#888]">{srv.desc}</p>
              </button>
            ))}
          </div>

          <div className="pt-6 flex justify-end">
            <button onClick={handleNextStep1} className="btn-primary text-xs px-8 py-3.5">
              <span>PRÓXIMO: DETALHES DA IDEIA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: DETALHES DA IDEIA & IMAGENS
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E8153B] uppercase block mb-1">
              ETAPA 02 DE 05
            </span>
            <h3 className="font-display text-2xl font-bold text-white uppercase">
              DETALHES DA SUA IDEIA
            </h3>
            <p className="text-xs text-[#888] mt-1">
              Estilo, posicionamento no corpo e envio de referências de arte.
            </p>
          </div>

          {/* Style Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
              Estilo Principal Pretendido:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'blackwork', label: 'Black Work' },
                { id: 'preto-e-cinza', label: 'Preto e Cinza' },
                { id: 'fineline', label: 'Fineline (Traço Fino)' },
                { id: 'oriental', label: 'Oriental' },
                { id: 'lettering', label: 'Lettering / Caligrafia' },
                { id: 'outro', label: 'Outro / Não sei' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStyle(st.id as TattooStyle)}
                  className={`text-xs py-3 px-3 font-display uppercase tracking-wider font-semibold border transition-all text-center ${
                    style === st.id
                      ? 'border-[#E8153B] bg-[#E8153B] text-white'
                      : 'border-white/10 bg-black/40 text-[#888] hover:text-white hover:border-white/20'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Body Part & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                Região do Corpo:
              </label>
              <select
                value={bodyPart}
                onChange={(e) => setBodyPart(e.target.value)}
                className="w-full bg-black/60 border border-white/15 text-white text-xs p-3.5 focus:border-[#E8153B] focus:outline-none"
              >
                <option value="Antebraço">Antebraço</option>
                <option value="Braço inteiro / Fechamento">Braço inteiro / Fechamento</option>
                <option value="Bíceps / Tríceps">Bíceps / Tríceps</option>
                <option value="Ombro">Ombro</option>
                <option value="Peito">Peito</option>
                <option value="Costas">Costas</option>
                <option value="Coxa">Coxa</option>
                <option value="Panturrilha / Canela">Panturrilha / Canela</option>
                <option value="Mão / Punho">Mão / Punho</option>
                <option value="Pescoço">Pescoço</option>
                <option value="Costelas">Costelas</option>
                <option value="Outro local">Outro local</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                Tamanho Estimado:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'pequeno', label: 'P (até 8cm)' },
                  { id: 'medio', label: 'M (8 a 15cm)' },
                  { id: 'grande', label: 'G (15 a 25cm)' },
                  { id: 'fechamento', label: 'Fechamento' },
                ].map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSize(sz.id as TattooSize)}
                    className={`text-[10px] py-3 px-1 font-display uppercase tracking-wider font-semibold border text-center transition-colors ${
                      size === sz.id
                        ? 'border-[#E8153B] bg-[#E8153B] text-white'
                        : 'border-white/10 bg-black/40 text-[#888] hover:text-white'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Size in CM */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
              Tamanho em centímetros (opcional):
            </label>
            <input
              type="text"
              placeholder="Ex: Aproximadamente 12 cm de altura por 7 cm de largura"
              value={sizeCustomCm}
              onChange={(e) => setSizeCustomCm(e.target.value)}
              className="w-full bg-black/60 border border-white/15 text-white text-xs p-3.5 focus:border-[#E8153B] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
              Descreva sua ideia e elementos principais *:
            </label>
            <textarea
              rows={4}
              placeholder="Ex: Gostaria de uma caveira com flores de peônia e sombreado pontilhado no antebraço esquerdo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/60 border border-white/15 text-white text-xs p-3.5 focus:border-[#E8153B] focus:outline-none leading-relaxed"
            />
          </div>

          {/* Image Upload Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
              Imagens de Referência (Até 5 imagens, máx 4MB cada):
            </label>
            <div className="border border-dashed border-white/20 p-6 text-center bg-black/30 hover:border-[#E8153B] transition-colors relative">
              <Upload className="w-7 h-7 text-[#888] mx-auto mb-2" />
              <p className="text-xs text-white font-medium">
                Clique para selecionar fotos ou arraste arquivos aqui
              </p>
              <p className="text-[11px] text-[#666] mt-1">PNG, JPG, WEBP até 4MB</p>
              <label htmlFor={fileUploadId} className="sr-only">
                Selecione até 5 imagens de referência
              </label>
              <input
                id={fileUploadId}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>

            {/* Thumbnails preview */}
            {referenceImages.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                {referenceImages.map((img, i) => (
                  <div key={i} className="relative aspect-square border border-white/20 group overflow-hidden">
                    <Image
                      src={img}
                      alt={`Referência ${i + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 hover:opacity-100"
                      aria-label="Remover foto"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="btn-secondary text-xs px-6 py-3 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button onClick={handleNextStep2} className="btn-primary text-xs px-8 py-3.5">
              <span>PRÓXIMO: ESCOLHER DATA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 3: DATA & HORÁRIO (CALENDÁRIO REAL)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E8153B] uppercase block mb-1">
              ETAPA 03 DE 05
            </span>
            <h3 className="font-display text-2xl font-bold text-white uppercase">
              DATA E HORÁRIO DE PREFERÊNCIA
            </h3>
            <p className="text-xs text-[#888] mt-1">
              Selecione o dia e um dos horários disponíveis em tempo real. Fuso: Brasília (America/Sao_Paulo).
            </p>
          </div>

          {/* Interactive Day Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#E8153B]" />
              <span>Dias Disponíveis para Atendimento:</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {availableDays.slice(0, 14).map((d) => (
                <button
                  key={d.dateStr}
                  type="button"
                  onClick={() => {
                    setSelectedDate(d.dateStr);
                    setSelectedTimeSlot('');
                  }}
                  className={`p-3 border text-center transition-all ${
                    selectedDate === d.dateStr
                      ? 'border-[#E8153B] bg-[#E8153B] text-white shadow-lg'
                      : 'border-white/10 bg-black/40 hover:border-white/25 text-[#999]'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">
                    {d.weekdayShort}
                  </span>
                  <span className="font-display text-xl font-bold block my-0.5">
                    {d.dayNumber}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider block opacity-75">
                    {d.monthShort}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selector */}
          {selectedDate ? (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2.5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E8153B]" />
                <span>Horários Disponíveis para {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR')}:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableHours.map((slot) => {
                  const isTaken = isTimeSlotBooked(selectedDate, slot);
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isTaken}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-4 border text-center font-display text-base font-bold tracking-wider transition-all ${
                        isTaken
                          ? 'border-white/5 bg-black/20 text-[#444] cursor-not-allowed line-through'
                          : selectedTimeSlot === slot
                          ? 'border-[#E8153B] bg-[#E8153B] text-white shadow-lg'
                          : 'border-white/10 bg-black/50 hover:border-white/30 text-white'
                      }`}
                    >
                      <span>{slot}</span>
                      <span className="block text-[9px] font-sans font-normal uppercase tracking-wider mt-1 opacity-70">
                        {isTaken ? 'Ocupado' : 'Disponível'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-black/30 border border-white/5 text-center text-xs text-[#888]">
              Selecione um dia acima para visualizar os horários disponíveis.
            </div>
          )}

          {/* Buttons */}
          <div className="pt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="btn-secondary text-xs px-6 py-3 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button onClick={handleNextStep3} className="btn-primary text-xs px-8 py-3.5">
              <span>PRÓXIMO: SEUS DADOS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 4: DADOS DO CLIENTE & LGPD
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#E8153B] uppercase block mb-1">
              ETAPA 04 DE 05
            </span>
            <h3 className="font-display text-2xl font-bold text-white uppercase">
              SEUS DADOS DE CONTATO
            </h3>
            <p className="text-xs text-[#888] mt-1">
              Informações necessárias para o Edy validar seu agendamento e manter contato.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                Nome Completo *:
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Eduardo Silva"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-black/60 border border-white/15 text-white text-xs p-3.5 focus:border-[#E8153B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                WhatsApp com DDD *:
              </label>
              <input
                type="tel"
                required
                placeholder="(61) 99999-9999"
                value={clientWhatsapp}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full bg-black/60 border border-white/15 text-white text-xs p-3.5 focus:border-[#E8153B] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                E-mail (opcional):
              </label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full bg-black/60 border border-white/15 text-white text-xs p-3.5 focus:border-[#E8153B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1.5">
                Data de Nascimento * (Maioridade +18):
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-black/60 border border-white/15 text-white text-xs p-3.5 focus:border-[#E8153B] focus:outline-none"
              />
            </div>
          </div>

          {/* Legal and Terms Checkboxes */}
          <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-[#A0A0A0]">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={lgpdAccepted}
                onChange={(e) => setLgpdAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#E8153B] rounded-none shrink-0"
              />
              <span>
                Concordo com a coleta e tratamento dos meus dados exclusivamente para fins de agendamento e contato deste estúdio, em total conformidade com a <strong className="text-white">LGPD (Lei 13.709/2018)</strong>.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#E8153B] rounded-none shrink-0"
              />
              <span>
                Estou ciente de que para confirmação definitiva da vaga é necessário o alinhamento prévio e <strong className="text-white">sinal de reserva</strong> pelo WhatsApp, e que remarcações devem ser solicitadas com no mínimo 48h de antecedência.
              </span>
            </label>
          </div>

          {/* Summary Preview Box */}
          <div className="bg-black/50 border border-white/10 p-4 text-xs space-y-1.5 text-[#888]">
            <div className="flex justify-between">
              <span>Data e Horário:</span>
              <span className="text-white font-medium">
                {selectedDate} às {selectedTimeSlot}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estilo e Local:</span>
              <span className="text-white font-medium">
                {style.toUpperCase()} · {bodyPart} ({size})
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="btn-secondary text-xs px-6 py-3 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              disabled={isSubmitting}
              onClick={handleSubmitBooking}
              className="btn-primary text-xs px-8 py-4 disabled:opacity-50"
            >
              {isSubmitting ? 'ENVIANDO SOLICITAÇÃO...' : 'ENVIAR E CONFIRMAR HORÁRIO'}
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 5: CONFIRMAÇÃO & SUCESSO (WHATSAPP + PIX)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 5 && createdAppointment && (
        <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#25D366] uppercase block mb-1">
              SOLICITAÇÃO RECEBIDA COM SUCESSO!
            </span>
            <h3 className="font-display text-3xl font-extrabold text-white uppercase">
              STATUS: AGUARDANDO CONFIRMAÇÃO
            </h3>
            <p className="text-sm text-[#A0A0A0] mt-2 max-w-lg mx-auto">
              Seu agendamento foi registrado no sistema do Edy Alves sob o código{' '}
              <strong className="text-white">{createdAppointment.id}</strong>.
            </p>
          </div>

          {/* Summary Box */}
          <div className="bg-black/60 border border-white/15 p-6 text-left max-w-lg mx-auto space-y-3 text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#888]">Cliente:</span>
              <span className="text-white font-bold">{createdAppointment.clientName}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#888]">Data & Horário:</span>
              <span className="text-white font-bold">
                {new Date(createdAppointment.date + 'T12:00:00').toLocaleDateString('pt-BR')} às{' '}
                {createdAppointment.timeSlot}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#888]">Estilo & Região:</span>
              <span className="text-white font-bold">
                {createdAppointment.style.toUpperCase()} · {createdAppointment.bodyPart}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">Status do Horário:</span>
              <span className="text-yellow-400 font-bold uppercase">Pré-reservado</span>
            </div>
          </div>

          {/* PRIMARY CALL TO ACTION: Open WhatsApp with Pre-filled formatted message */}
          <div className="pt-2 max-w-lg mx-auto space-y-4">
            <a
              href={`${siteConfig.contact.whatsappUrl}?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-display text-base font-bold uppercase tracking-wider py-4 px-6 flex items-center justify-center gap-3 shadow-xl shadow-[#25D366]/20 transition-all hover:scale-102"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>NOTIFICAR EDY NO WHATSAPP AGORA</span>
            </a>
            <p className="text-[11px] text-[#777]">
              Ao clicar, uma mensagem completa com os dados do seu agendamento será aberta diretamente no WhatsApp do tatuador.
            </p>
          </div>

          {/* OPTIONAL PIX DEPOSIT CARD */}
          <div className="mt-8 pt-8 border-t border-white/10 max-w-lg mx-auto text-left bg-black/40 p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E8153B]" />
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Sinal de Reserva (Opcional antecipado)
              </h4>
            </div>
            <p className="text-xs text-[#888] leading-relaxed mb-4">
              Caso queira garantir e travar seu horário de imediato, envie o sinal de reserva ({siteConfig.defaultSettings.depositAmount}) via PIX:
            </p>

            <div className="flex items-center justify-between bg-black p-3 border border-white/10 text-xs">
              <div>
                <span className="text-[#666] block text-[10px]">Chave PIX ({siteConfig.defaultSettings.pixKeyType}):</span>
                <span className="font-mono text-white font-bold">{siteConfig.defaultSettings.pixKey}</span>
              </div>
              <button
                onClick={handleCopyPix}
                className="p-2 text-white hover:text-[#E8153B] flex items-center gap-1 transition-colors"
                title="Copiar Chave PIX"
              >
                {copiedPix ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span className="text-[10px]">{copiedPix ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <p className="text-[10px] text-[#666] mt-2">
              Beneficiário: {siteConfig.defaultSettings.pixBeneficiary}. Envie o comprovante na conversa do WhatsApp.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                setCurrentStep(1);
                setCreatedAppointment(null);
              }}
              className="text-xs text-[#777] hover:text-white uppercase tracking-wider underline underline-offset-4"
            >
              Realizar outra solicitação de agendamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
