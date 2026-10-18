export type ServiceType = 'tatuagem-nova' | 'cover-up' | 'retoque' | 'projeto-exclusivo' | 'outro';

export type TattooStyle = 'blackwork' | 'preto-e-cinza' | 'fineline' | 'oriental' | 'lettering' | 'outro';

export type TattooSize = 'pequeno' | 'medio' | 'grande' | 'fechamento';

export type AppointmentStatus = 'pendente' | 'confirmado' | 'concluido' | 'cancelado';

export interface ServiceItem {
  id: string;
  name: string;
  slug: ServiceType;
  description: string;
  startingPrice: string;
  iconName: string;
  durationApprox: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  style: 'Black Work' | 'Preto e Cinza' | 'Fineline' | 'Outros';
  bodyPart: string;
  sessionTime: string;
  imageUrl: string;
  description: string;
  isRealWork: boolean;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  rating: number;
  date: string;
  comment: string;
  tattooDescription: string;
  isRealPlaceholder: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'procedimento' | 'cuidados' | 'agendamento' | 'regras';
}

export interface Appointment {
  id: string;
  createdAt: string;
  status: AppointmentStatus;
  
  // Step 1: Serviço
  serviceType: ServiceType;
  
  // Step 2: Detalhes
  style: TattooStyle;
  bodyPart: string;
  size: TattooSize;
  sizeCustomCm?: string;
  description: string;
  referenceImages: string[]; // Base64 data URLs or stored URLs
  
  // Step 3: Data & Horário
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  
  // Step 4: Dados do Cliente
  clientName: string;
  clientWhatsapp: string;
  clientEmail?: string;
  birthDate: string; // YYYY-MM-DD
  lgpdAccepted: boolean;
  termsAccepted: boolean;
  
  // Admin Notes
  adminNotes?: string;
  updatedAt?: string;
}

export interface StudioSettings {
  workingDays: number[]; // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  workingHours: string[]; // ["10:00", "14:00", "17:00", "19:00"]
  blockedDates: string[]; // ["2026-10-20", "2026-11-02"]
  pixKey: string;
  pixKeyType: string;
  pixBeneficiary: string;
  depositAmount: string;
}
