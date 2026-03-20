import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase not configured');
      return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ email, created_at: new Date().toISOString() }),
    });

    if (res.status === 409) {
      // Already registered
      return NextResponse.json({ success: true, message: 'Bereits registriert.' });
    }

    if (!res.ok) {
      const err = await res.text();
      console.error('Supabase error:', err);
      return NextResponse.json({ error: 'Registrierung fehlgeschlagen.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}
