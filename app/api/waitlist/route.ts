import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.easyname.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 });
    }

    // Check if already exists
    const checkRes = await fetch(`${supabaseUrl}/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}&select=id,confirmed`, {
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
      // Resend confirmation
      const tokenRes = await fetch(`${supabaseUrl}/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}&select=confirm_token`, {
        headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` },
      });
      const tokenData = await tokenRes.json();
      const token = tokenData[0]?.confirm_token;
      if (token) await sendConfirmationEmail(email, token);
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

    await sendConfirmationEmail(email, token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}

async function sendConfirmationEmail(email: string, token: string) {
  const confirmUrl = `https://sup.date/api/confirm?token=${token}`;

  await transporter.sendMail({
    from: '"SUPDATE" <noreply@sup.date>',
    to: email,
    subject: 'Bitte bestätige deine Anmeldung bei SUPDATE',
    text: `Hallo,\n\nbitte bestätige deine Anmeldung auf der SUPDATE Warteliste:\n\n${confirmUrl}\n\nDieser Link ist 7 Tage gültig.\n\nFalls du dich nicht angemeldet hast, ignoriere diese E-Mail.\n\nDas SUPDATE-Team`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 40px 20px;">
        <div style="max-width: 480px; margin: 0 auto;">
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px; color: #ffffff;">SUPDATE</h1>
          <p style="color: #888; font-size: 13px; margin-bottom: 32px;">Hör auf, Ziele zu setzen. Fang an, sie zu halten.</p>
          
          <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Bitte bestätige deine Anmeldung</h2>
          <p style="color: #cccccc; line-height: 1.6; margin-bottom: 32px;">
            Du hast dich für die SUPDATE Warteliste angemeldet. Klicke den Button um deine E-Mail-Adresse zu bestätigen.
          </p>
          
          <a href="${confirmUrl}" style="display: inline-block; background: #ffffff; color: #000000; text-decoration: none; font-weight: 600; font-size: 15px; padding: 14px 28px; border-radius: 8px; margin-bottom: 32px;">
            ✓ Anmeldung bestätigen
          </a>
          
          <p style="color: #666; font-size: 12px; line-height: 1.5;">
            Oder kopiere diesen Link in deinen Browser:<br>
            <span style="color: #888;">${confirmUrl}</span>
          </p>
          
          <hr style="border: none; border-top: 1px solid #222; margin: 32px 0;">
          <p style="color: #555; font-size: 12px;">
            Falls du dich nicht angemeldet hast, ignoriere diese E-Mail.<br>
            sup.date · © 2026
          </p>
        </div>
      </body>
      </html>
    `,
  });
}
