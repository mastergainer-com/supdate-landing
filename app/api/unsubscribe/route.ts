import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse(resultPage('❌', 'Ungültiger Link.', false), { status: 400, headers: { 'Content-Type': 'text/html' } });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return new NextResponse(resultPage('❌', 'Serverfehler.', false), { status: 500, headers: { 'Content-Type': 'text/html' } });
  }

  // Find entry by token
  const res = await fetch(`${supabaseUrl}/rest/v1/waitlist?confirm_token=eq.${token}&select=id,email`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
  });
  const entries = await res.json();

  if (!entries.length) {
    return new NextResponse(resultPage('❌', 'Link ungültig oder bereits abgemeldet.', false), { status: 404, headers: { 'Content-Type': 'text/html' } });
  }

  // Delete entry
  const deleteRes = await fetch(`${supabaseUrl}/rest/v1/waitlist?confirm_token=eq.${token}`, {
    method: 'DELETE',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
    },
  });

  if (!deleteRes.ok) {
    return new NextResponse(resultPage('❌', 'Abmeldung fehlgeschlagen. Bitte versuche es erneut.', false), { status: 500, headers: { 'Content-Type': 'text/html' } });
  }

  return new NextResponse(resultPage('👋', 'Du wurdest erfolgreich abgemeldet.', true), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

function resultPage(emoji: string, message: string, success: boolean) {
  const sub = success
    ? 'Deine E-Mail-Adresse wurde von der Warteliste entfernt.'
    : '';
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>SUPDATE — Abmelden</title>
<style>body{font-family:-apple-system,sans-serif;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.box{text-align:center;max-width:400px;padding:40px}h1{font-size:2rem;margin-bottom:8px}p{color:#888;margin-bottom:16px}
.badge{font-size:3rem;margin-bottom:24px}a{color:#fff;text-decoration:underline}</style></head>
<body><div class="box"><div class="badge">${emoji}</div><h1>SUPDATE</h1><p>${message}</p>
${sub ? `<p style="color:#666;font-size:13px">${sub}</p>` : ''}
<p style="margin-top:32px"><a href="https://sup.date">← Zurück zur Website</a></p></div></body></html>`;
}
