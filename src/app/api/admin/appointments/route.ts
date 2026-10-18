import { NextRequest, NextResponse } from 'next/server';
import { getAppointments } from '@/lib/storage';

function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get('edy_admin_token')?.value;
  const authHeader = req.headers.get('authorization');
  return !!cookie || (!!authHeader && authHeader.startsWith('Bearer edy_auth_'));
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const appointments = await getAppointments();
    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao listar agendamentos.' },
      { status: 500 }
    );
  }
}
