import fs from 'fs/promises';
import path from 'path';
import { Appointment, StudioSettings, AppointmentStatus } from '@/types';
import { siteConfig } from '@/config/siteConfig';

const DATA_DIR = path.join(process.cwd(), 'data');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// In-memory cache fallback for serverless/edge environments
let inMemoryAppointments: Appointment[] | null = null;
let inMemorySettings: StudioSettings | null = null;

// Initial sample seed appointments (clearly marked as test data)
const INITIAL_SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-seed-101',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'pendente',
    serviceType: 'tatuagem-nova',
    style: 'blackwork',
    bodyPart: 'Antebraço direito',
    size: 'medio',
    sizeCustomCm: '15 cm',
    description: '[EXEMPLO/SEED] Ideia de serpente enrolada em adaga com pontilhismo denso e linhas pretas sólidas.',
    referenceImages: ['/images/tattoo-medusa.png'],
    date: '2026-10-25',
    timeSlot: '14:00',
    clientName: 'Rodrigo Silva (Exemplo)',
    clientWhatsapp: '(61) 99123-4567',
    clientEmail: 'rodrigo.exemplo@gmail.com',
    birthDate: '1998-05-14',
    lgpdAccepted: true,
    termsAccepted: true,
    adminNotes: 'Aguardando envio do sinal de reserva via WhatsApp.',
  },
  {
    id: 'apt-seed-102',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    status: 'confirmado',
    serviceType: 'tatuagem-nova',
    style: 'preto-e-cinza',
    bodyPart: 'Braço (bíceps)',
    size: 'grande',
    sizeCustomCm: '20 cm',
    description: '[EXEMPLO/SEED] Leão com relógio romano sombreado estilo clássico preto e cinza.',
    referenceImages: ['/images/tattoo-lion-clock.jpg'],
    date: '2026-10-28',
    timeSlot: '10:00',
    clientName: 'Camila Albuquerque (Exemplo)',
    clientWhatsapp: '(61) 98765-4321',
    clientEmail: 'camila.exemplo@hotmail.com',
    birthDate: '1995-11-20',
    lgpdAccepted: true,
    termsAccepted: true,
    adminNotes: 'Sinal recebido. Projeto pronto para alinhamento.',
  },
  {
    id: 'apt-seed-103',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    status: 'concluido',
    serviceType: 'cover-up',
    style: 'blackwork',
    bodyPart: 'Ombro',
    size: 'grande',
    description: '[EXEMPLO/SEED] Cobertura de tribal antigo dos anos 2000 com crânio e rosas pretas.',
    referenceImages: ['/images/tattoo-skull-peony.jpg'],
    date: '2026-10-10',
    timeSlot: '17:00',
    clientName: 'Marcos Vinícius (Exemplo)',
    clientWhatsapp: '(61) 98111-2233',
    birthDate: '1990-03-08',
    lgpdAccepted: true,
    termsAccepted: true,
    adminNotes: 'Sessão concluída com sucesso. Cicatrização 100%.',
  },
];

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory exists or in-memory fallback
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(APPOINTMENTS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    inMemoryAppointments = parsed;
    return parsed;
  } catch {
    if (!inMemoryAppointments) {
      inMemoryAppointments = [...INITIAL_SEED_APPOINTMENTS];
      try {
        await ensureDataDir();
        await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(inMemoryAppointments, null, 2), 'utf-8');
      } catch {
        // Ignored in read-only
      }
    }
    return inMemoryAppointments;
  }
}

export async function saveAppointments(appointments: Appointment[]): Promise<void> {
  inMemoryAppointments = appointments;
  try {
    await ensureDataDir();
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write appointments file, cached in-memory only', err);
  }
}

export async function createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> {
  const all = await getAppointments();
  
  // Conflict check: Avoid double booking the same date and time slot
  const isSlotTaken = all.some(
    (apt) => apt.date === data.date && apt.timeSlot === data.timeSlot && apt.status !== 'cancelado'
  );
  
  if (isSlotTaken) {
    throw new Error('Este horário já está reservado. Por favor, escolha outro horário ou dia.');
  }

  const newAppointment: Appointment = {
    ...data,
    id: `apt-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'pendente',
  };

  all.unshift(newAppointment);
  await saveAppointments(all);
  return newAppointment;
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
  adminNotes?: string
): Promise<Appointment | null> {
  const all = await getAppointments();
  const index = all.findIndex((a) => a.id === id);
  if (index === -1) return null;

  all[index] = {
    ...all[index],
    status,
    adminNotes: adminNotes !== undefined ? adminNotes : all[index].adminNotes,
    updatedAt: new Date().toISOString(),
  };

  await saveAppointments(all);
  return all[index];
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const all = await getAppointments();
  const filtered = all.filter((a) => a.id !== id);
  if (filtered.length === all.length) return false;
  await saveAppointments(filtered);
  return true;
}

export async function getStudioSettings(): Promise<StudioSettings> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    inMemorySettings = parsed;
    return parsed;
  } catch {
    if (!inMemorySettings) {
      inMemorySettings = { ...siteConfig.defaultSettings };
      try {
        await ensureDataDir();
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(inMemorySettings, null, 2), 'utf-8');
      } catch {
        // Ignored
      }
    }
    return inMemorySettings;
  }
}

export async function updateStudioSettings(settings: Partial<StudioSettings>): Promise<StudioSettings> {
  const current = await getStudioSettings();
  const updated: StudioSettings = { ...current, ...settings };
  inMemorySettings = updated;
  try {
    await ensureDataDir();
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write settings file, stored in memory', err);
  }
  return updated;
}

export async function getBookedSlots(): Promise<{ date: string; timeSlot: string }[]> {
  const all = await getAppointments();
  return all
    .filter((a) => a.status === 'pendente' || a.status === 'confirmado')
    .map((a) => ({ date: a.date, timeSlot: a.timeSlot }));
}
