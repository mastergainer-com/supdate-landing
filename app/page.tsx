'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const d = await res.json();
        setError(d.error || 'Etwas ist schiefgelaufen.');
      }
    } catch {
      setError('Verbindungsfehler. Bitte versuche es nochmal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d14] text-white flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center max-w-2xl mx-auto w-full">

        {/* Logo/Brand */}
        <div className="mb-10">
          <span className="text-[#00d4ff] font-mono text-sm tracking-widest uppercase">sup.date</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
          Hör auf, Ziele zu setzen.{' '}
          <span className="text-[#00d4ff]">Fang an, sie zu halten.</span>
        </h1>

        {/* Sub-Headline */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          SUPDATE bringt wöchentliche Accountability in deine Gruppe —
          strukturiert, respektvoll, wirksam.
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-[#00d4ff] opacity-40 mb-8" />

        {/* Body */}
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-12 max-w-lg">
          Alleine scheitert man lautlos. In einer SUPDATE-Gruppe nicht.{' '}
          <strong className="text-gray-200">5–10 Menschen.</strong>{' '}
          Ein wöchentlicher Check-in. Klarer Fokus: Was habe ich getan?
          Was kommt nächste Woche? Kein Judging — aber klare Regeln.
        </p>

        {/* CTA Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <p className="text-sm text-gray-400 mb-4">
              Ich bin dabei — informier mich wenn es losgeht
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.at"
                className="flex-1 px-4 py-3 rounded-lg bg-[#1a1a2e] border border-[#2a2a4e] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#00d4ff] text-[#0d0d14] font-semibold rounded-lg hover:bg-[#00b8d9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? '...' : 'Anmelden'}
              </button>
            </div>
            {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
          </form>
        ) : (
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#00d4ff] font-medium">Du bist dabei!</p>
              <p className="text-gray-400 text-sm">Wir melden uns wenn SUPDATE startet.</p>
            </div>
          </div>
        )}

        {/* Social proof placeholder */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <p className="text-xs text-gray-600 uppercase tracking-widest">Coming soon</p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#2a2a4e]" />
            ))}
            <div className="w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#2a2a4e] flex items-center justify-center">
              <span className="text-[8px] text-gray-500">+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#1a1a2e]">
        <p className="text-gray-600 text-sm">
          sup.date &nbsp;·&nbsp; © 2026
        </p>
      </footer>
    </main>
  );
}
