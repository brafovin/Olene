import Link from 'next/link';
import { Sparkles, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'Sommerkleider', href: '/shop?category=Sommerkleider' },
    { label: 'Zweiteilige Sets', href: '/shop?category=Zweiteilige+Sets' },
    { label: 'Tops & T-Shirts', href: '/shop?category=Tops+%26+T-Shirts' },
    { label: 'Shorts & Röcke', href: '/shop?category=Shorts' },
    { label: 'Strand-Outfits', href: '/shop?category=Strand-Outfits' },
    { label: 'Sale', href: '/shop?badge=Sale' },
  ],
  Service: [
    { label: 'Größentabelle', href: '#' },
    { label: 'Versand & Lieferung', href: '#' },
    { label: 'Rücksendungen', href: '#' },
    { label: 'Zahlungsmethoden', href: '#' },
    { label: 'Kontakt', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  Über: [
    { label: 'Über OLENE', href: '#' },
    { label: 'Nachhaltigkeit', href: '#' },
    { label: 'Karriere', href: '#' },
    { label: 'Presse', href: '#' },
    { label: 'Affiliate', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 mt-24">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles size={20} className="text-brand-purple" />
              <span className="font-display text-3xl font-bold gradient-text">OLENE</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Entdecke die heißesten Sommer-Looks 2025. Modisch, trendig und hochwertig – für junge Frauen, die Stil leben.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Youtube, label: 'YouTube', href: '#' },
                { icon: Mail, label: 'Email', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-widest">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Newsletter – 10% Rabatt sichern!</h3>
              <p className="text-white/50 text-sm">Kein Spam. Nur die besten Deals und neue Styles.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="deine@email.de"
                className="input-dark md:w-64"
              />
              <button type="submit" className="btn-primary whitespace-nowrap px-5 py-3">
                Anmelden
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© 2025 OLENE Fashion. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-6">
            {['Datenschutz', 'AGB', 'Impressum', 'Cookie-Einstellungen'].map((l) => (
              <a key={l} href="#" className="hover:text-white/60 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
