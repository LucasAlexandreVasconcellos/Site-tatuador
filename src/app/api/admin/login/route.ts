import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'edyalves2018';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Senha de acesso incorreta.' },
        { status: 401 }
      );
    }

    // Set HTTP-only admin session cookie
    const token = 'edy_auth_' + Buffer.from(Date.now().toString()).toString('base64');
    const response = NextResponse.json({
      success: true,
      message: 'Autenticado com sucesso!',
      token,
    });

    response.cookies.set({
      name: 'edy_admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao autenticar.' }, { status: 500 });
  }
}
