'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
        style={{ background: 'linear-gradient(135deg, #0d0820 0%, #1a1a1a 100%)' }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8A2BE2 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #00AEEF 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative space-y-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center">
            <Mail size={28} className="text-brand-purple" />
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Bleib auf dem <span className="gradient-text">Laufenden</span>
            </h2>
            <p className="text-white/50 text-lg max-w-md mx-auto">
              Melde dich für unseren Newsletter an und erhalte <strong className="text-white">10% Rabatt</strong> auf deine erste Bestellung!
            </p>
          </div>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-green-400 text-lg font-semibold">
              <CheckCircle size={24} />
              Danke! 10% Rabatt-Code wurde an deine E-Mail gesendet.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                required
                className="input-dark text-center sm:text-left"
              />
              <button type="submit" className="btn-primary whitespace-nowrap px-8">
                10% sichern
              </button>
            </form>
          )}

          <p className="text-white/30 text-xs">
            Kein Spam – nur die heißesten Deals. Jederzeit abmeldbar.
          </p>
        </div>
      </div>
    </section>
  );
}
