import { NextRequest, NextResponse } from 'next/server';
import { updateAppointmentStatus, deleteAppointment } from '@/lib/storage';

function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get('edy_admin_token')?.value;
  const authHeader = req.headers.get('authorization');
  return !!cookie || (!!authHeader && authHeader.startsWith('Bearer edy_auth_'));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status, adminNotes } = await req.json();

    const updated = await updateAppointmentStatus(id, status, adminNotes);
    if (!updated) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar agendamento.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await deleteAppointment(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Agendamento removido.' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao excluir agendamento.' },
      { status: 500 }
    );
  }
}
