import { NextRequest, NextResponse } from 'next/server';
import { getStudioSettings, updateStudioSettings } from '@/lib/storage';

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
    const settings = await getStudioSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar configurações.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const updated = await updateStudioSettings(data);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao salvar configurações.' },
      { status: 500 }
    );
  }
}
