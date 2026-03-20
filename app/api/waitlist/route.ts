import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseKey || !resendKey) {
      return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 });
    }

    // Check if already exists
    const checkRes = await fetch(`${supabaseUrl}/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}&select=id,confirmed,confirm_token`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
    });
    const existing = await checkRes.json();

    if (existing.length > 0) {
      if (existing[0].confirmed) {
        return NextResponse.json({ success: true, message: 'Du bist bereits angemeldet.' });
      }
      // Resend confirmation email
      const token = existing[0].confirm_token;
      if (token) await sendConfirmationEmail(email, token, resendKey);
      return NextResponse.json({ success: true, message: 'Bestätigungsmail erneut gesendet.' });
    }

    // Insert new entry
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ email, confirmed: false }),
    });

    if (!insertRes.ok) {
      const err = await insertRes.text();
      console.error('Supabase insert error:', err);
      return NextResponse.json({ error: 'Registrierung fehlgeschlagen.' }, { status: 500 });
    }

    const inserted = await insertRes.json();
    const token = inserted[0]?.confirm_token;

    if (!token) {
      return NextResponse.json({ error: 'Token-Fehler.' }, { status: 500 });
    }

    await sendConfirmationEmail(email, token, resendKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}

async function sendConfirmationEmail(email: string, token: string, resendKey: string) {
  const confirmUrl = `https://sup.date/api/confirm?token=${token}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SUPDATE <noreply@sup.date>',
      to: [email],
      subject: 'Bitte bestätige deine Anmeldung bei SUPDATE',
      text: `Hallo,\n\nbitte bestätige deine Anmeldung auf der SUPDATE Warteliste:\n\n${confirmUrl}\n\nFalls du dich nicht angemeldet hast, ignoriere diese E-Mail.\n\nDas SUPDATE-Team`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 40px 20px;">
          <div style="max-width: 480px; margin: 0 auto;">
            <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 4px; color: #ffffff;">SUPDATE</h1>
            <p style="color: #666; font-size: 13px; margin-bottom: 40px; margin-top: 0;">Hör auf, Ziele zu setzen. Fang an, sie zu halten.</p>
            
            <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #ffffff;">Bestätige deine Anmeldung</h2>
            <p style="color: #aaaaaa; line-height: 1.6; margin-bottom: 32px; font-size: 15px;">
              Du stehst auf der Warteliste von SUPDATE. Ein Klick und du bist dabei.
            </p>
            
            <a href="${confirmUrl}" style="display: inline-block; background: #ffffff; color: #000000; text-decoration: none; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 8px; margin-bottom: 40px;">
              ✓ Anmeldung bestätigen
            </a>
            
            <p style="color: #444; font-size: 12px; line-height: 1.6;">
              Oder diesen Link im Browser öffnen:<br>
              <a href="${confirmUrl}" style="color: #666;">${confirmUrl}</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #1a1a1a; margin: 32px 0;">
            <p style="color: #444; font-size: 12px; margin: 0;">
              Falls du dich nicht angemeldet hast, ignoriere diese E-Mail.<br>
              sup.date · © 2026
            </p>
          </div>
        </body>
        </html>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    throw new Error('Email send failed');
  }
}
