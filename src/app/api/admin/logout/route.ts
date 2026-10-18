import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Desconectado.' });
  response.cookies.delete('edy_admin_token');
  return response;
}
