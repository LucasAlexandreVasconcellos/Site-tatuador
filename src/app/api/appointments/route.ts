import { NextRequest, NextResponse } from 'next/server';
import { createAppointment, getBookedSlots, getStudioSettings } from '@/lib/storage';
import { Appointment } from '@/types';

export async function GET() {
  try {
    const [bookedSlots, settings] = await Promise.all([
      getBookedSlots(),
      getStudioSettings(),
    ]);

    return NextResponse.json({
      bookedSlots,
      settings: {
        workingDays: settings.workingDays,
        workingHours: settings.workingHours,
        blockedDates: settings.blockedDates,
      },
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Erro ao consultar horários disponíveis.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Anti-spam honeypot
    if (body.website_url_hp) {
      return NextResponse.json({ error: 'Spam detectado' }, { status: 400 });
    }

    // Server-side validation
    const {
      serviceType,
      style,
      bodyPart,
      size,
      sizeCustomCm,
      description,
      referenceImages,
      date,
      timeSlot,
      clientName,
      clientWhatsapp,
      clientEmail,
      birthDate,
      lgpdAccepted,
      termsAccepted,
    } = body;

    if (!serviceType || !style || !bodyPart || !size || !description) {
      return NextResponse.json(
        { error: 'Preencha todos os detalhes da ideia da tatuagem.' },
        { status: 400 }
      );
    }

    if (!date || !timeSlot) {
      return NextResponse.json(
        { error: 'Selecione uma data e um horário para a sessão.' },
        { status: 400 }
      );
    }

    if (!clientName || !clientWhatsapp || !birthDate) {
      return NextResponse.json(
        { error: 'Preencha seu nome, WhatsApp e data de nascimento.' },
        { status: 400 }
      );
    }

    if (!lgpdAccepted || !termsAccepted) {
      return NextResponse.json(
        { error: 'É obrigatório aceitar os termos de privacidade e regras do estúdio.' },
        { status: 400 }
      );
    }

    // Validate date is not past
    const selected = new Date(date + 'T23:59:59');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      return NextResponse.json(
        { error: 'A data selecionada não pode ser no passado.' },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = await createAppointment({
      serviceType,
      style,
      bodyPart,
      size,
      sizeCustomCm: sizeCustomCm || undefined,
      description,
      referenceImages: referenceImages || [],
      date,
      timeSlot,
      clientName,
      clientWhatsapp,
      clientEmail: clientEmail || undefined,
      birthDate,
      lgpdAccepted,
      termsAccepted,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Agendamento registrado com sucesso!',
        appointment,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating appointment:', error);
    const message = error instanceof Error ? error.message : 'Erro interno ao processar agendamento.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
