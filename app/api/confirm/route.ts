import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse(errorPage('Ungültiger Link.'), { status: 400, headers: { 'Content-Type': 'text/html' } });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return new NextResponse(errorPage('Serverfehler.'), { status: 500, headers: { 'Content-Type': 'text/html' } });
  }

  // Find entry by token
  const res = await fetch(`${supabaseUrl}/rest/v1/waitlist?confirm_token=eq.${token}&select=id,confirmed`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
  });
  const entries = await res.json();

  if (!entries.length) {
    return new NextResponse(errorPage('Link ungültig oder abgelaufen.'), { status: 404, headers: { 'Content-Type': 'text/html' } });
  }

  if (entries[0].confirmed) {
    return new NextResponse(successPage('Du bist bereits bestätigt!'), { status: 200, headers: { 'Content-Type': 'text/html' } });
  }

  // Confirm
  await fetch(`${supabaseUrl}/rest/v1/waitlist?confirm_token=eq.${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify({ confirmed: true, confirmed_at: new Date().toISOString() }),
  });

  return new NextResponse(successPage('Anmeldung bestätigt! Du bist auf der Warteliste.'), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

function successPage(message: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>SUPDATE</title>
<style>body{font-family:-apple-system,sans-serif;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.box{text-align:center;max-width:400px;padding:40px}h1{font-size:2rem;margin-bottom:8px}p{color:#888;margin-bottom:32px}
.badge{font-size:3rem;margin-bottom:24px}a{color:#fff;text-decoration:underline}</style></head>
<body><div class="box"><div class="badge">✅</div><h1>SUPDATE</h1><p>${message}</p>
<p style="color:#666;font-size:13px">Wir informieren dich wenn es losgeht.</p>
<p style="margin-top:32px"><a href="https://sup.date">← Zurück zur Website</a></p></div></body></html>`;
}

function errorPage(message: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>SUPDATE</title>
<style>body{font-family:-apple-system,sans-serif;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
.box{text-align:center;max-width:400px;padding:40px}h1{font-size:2rem;margin-bottom:8px}p{color:#888}
.badge{font-size:3rem;margin-bottom:24px}a{color:#fff;text-decoration:underline}</style></head>
<body><div class="box"><div class="badge">❌</div><h1>SUPDATE</h1><p>${message}</p>
<p style="margin-top:32px"><a href="https://sup.date">← Zurück zur Website</a></p></div></body></html>`;
}
