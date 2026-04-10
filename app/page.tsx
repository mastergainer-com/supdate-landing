import Link from 'next/link';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Wöchentliche Updates',
    description:
      'Jeden Sonntag teilst du deinen Fortschritt mit deiner Gruppe. Kein Roman — nur ein kurzes, strukturiertes Update: Was habe ich geschafft? Was kommt nächste Woche?',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Echte Accountability',
    description:
      'Keine leeren Vorsätze mehr. Deine Gruppe sieht, ob du dranbleibst. Das ist kein Druck — das ist Verbindlichkeit, die funktioniert.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Kleine Gruppen',
    description:
      '5–10 Personen pro Gruppe. Groß genug für verschiedene Perspektiven, klein genug, damit sich jeder gesehen fühlt.',
  },
];

const testimonials = [
  {
    name: 'Markus K.',
    text: 'Seit ich bei SUPDATE bin, habe ich mehr erreicht als im ganzen letzten Jahr. Die wöchentlichen Updates halten mich auf Kurs.',
  },
  {
    name: 'Sarah M.',
    text: 'Endlich eine Accountability-Lösung, die nicht nervig ist. Die Gruppe motiviert mich jede Woche aufs Neue.',
  },
  {
    name: 'Thomas B.',
    text: 'Ich war skeptisch, aber nach 4 Wochen war klar: SUPDATE funktioniert. Meine Gruppe ist mein Geheimrezept.',
  },
];

const faqs = [
  {
    q: 'Was kostet SUPDATE?',
    a: 'SUPDATE ist aktuell komplett kostenlos. Wir glauben, dass Accountability keine Paywall braucht.',
  },
  {
    q: 'Wie groß sollte eine Gruppe sein?',
    a: 'Wir empfehlen 5–10 Personen. Das ist groß genug für Vielfalt, aber klein genug, damit sich jeder einbringen kann.',
  },
  {
    q: 'Was ist, wenn ich mein Ziel nicht erreiche?',
    a: 'Kein Problem. SUPDATE ist kein Tribunal. Du reflektierst ehrlich, was passiert ist, und planst die nächste Woche. Dranbleiben zählt mehr als Perfektion.',
  },
  {
    q: 'Kann ich mehreren Gruppen beitreten?',
    a: 'Ja! Du kannst in mehreren Gruppen gleichzeitig aktiv sein — zum Beispiel eine für Fitness und eine für berufliche Ziele.',
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d14] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0d0d14]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-[#00d4ff] font-mono text-sm tracking-widest uppercase font-bold">
            sup.date
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
          <Link
            href="/login"
            className="text-sm px-5 py-2 rounded-lg border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Hör auf, Ziele zu setzen.{' '}
            <span className="text-[#00d4ff]">Fang an, sie zu halten.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            SUPDATE bringt wöchentliche Accountability in deine Gruppe —
            strukturiert, respektvoll, wirksam. Alleine scheitert man lautlos.
            In einer SUPDATE-Gruppe nicht.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-[#00d4ff] text-[#0d0d14] font-semibold rounded-lg hover:bg-[#00b8d9] transition-colors text-base"
            >
              Jetzt kostenlos starten
            </Link>
            <Link
              href="#features"
              className="px-8 py-3.5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors text-base"
            >
              Mehr erfahren
            </Link>
          </div>
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff]/30 to-[#00d4ff]/10 border-2 border-[#0d0d14]"
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">
              <span className="text-white font-medium">50+</span> Nutzer bereits dabei
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Warum SUPDATE funktioniert</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Drei einfache Prinzipien, die den Unterschied machen.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-2xl bg-[#12121e] border border-white/5 hover:border-[#00d4ff]/20 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] mb-5">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-20 md:py-28 bg-[#0a0a12]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Was unsere Nutzer sagen</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Echte Menschen, echte Ergebnisse.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 rounded-2xl bg-[#12121e] border border-white/5"
              >
                <StarRating />
                <p className="text-gray-300 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-medium text-white">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Häufige Fragen</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-[#12121e] border border-white/5"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit für echte Accountability?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Starte jetzt kostenlos und finde deine Gruppe. Keine Kreditkarte nötig.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3.5 bg-[#00d4ff] text-[#0d0d14] font-semibold rounded-lg hover:bg-[#00b8d9] transition-colors text-base"
          >
            Gratis Account erstellen
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-[#00d4ff] font-mono text-sm tracking-widest uppercase font-bold">
              sup.date
            </Link>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Wöchentliche Accountability für Menschen, die ihre Ziele ernst nehmen.
            </p>
          </div>

          {/* Produkt */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Produkt</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li><Link href="/register" className="hover:text-white transition-colors">Registrieren</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Anmelden</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Rechtliches</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li><Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" className="hover:text-white transition-colors">AGB</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Kontakt</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>
                <a href="mailto:hello@sup.date" className="hover:text-white transition-colors">
                  hello@sup.date
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm">© 2026 sup.date. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </main>
  );
}
