'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

type Tab = 'login' | 'register';

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-sm space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8A2BE2, #00AEEF)' }}>
            <Sparkles size={32} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              {tab === 'login' ? 'Willkommen zurück!' : 'Konto erstellt!'}
            </h1>
            <p className="text-white/50">
              {tab === 'login'
                ? 'Du bist jetzt eingeloggt.'
                : 'Dein OLENE-Konto wurde erfolgreich erstellt.'}
            </p>
          </div>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2 w-full justify-center">
            Zum Shop
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="w-full max-w-md mx-auto px-4">
        {/* Card */}
        <div className="bg-surface rounded-3xl border border-white/10 p-8 space-y-8 relative overflow-hidden">
          {/* Background */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8A2BE2, transparent)' }} />

          {/* Logo */}
          <div className="text-center">
            <div className="font-display text-3xl font-bold gradient-text">OLENE</div>
            <p className="text-white/40 text-sm mt-1">Dein Sommer-Fashion-Shop</p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-surface-3 rounded-2xl p-1 border border-white/10">
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  tab === t ? 'text-white' : 'text-white/40 hover:text-white/60'
                }`}
                style={tab === t ? { background: 'linear-gradient(135deg, #8A2BE2, #00AEEF)' } : undefined}
              >
                {t === 'login' ? 'Anmelden' : 'Registrieren'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Vollständiger Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    required
                    placeholder="Sophie Müller"
                    className="input-dark pl-10"
                  />
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm text-white/60 mb-1.5">E-Mail-Adresse</label>
              <div className="relative">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                  placeholder="sophie@example.de"
                  className="input-dark pl-10"
                />
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-white/60">Passwort</label>
                {tab === 'login' && (
                  <a href="#" className="text-xs text-brand-purple hover:text-brand-purple-light transition-colors">
                    Vergessen?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input-dark pl-10 pr-10"
                />
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {tab === 'register' && (
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Passwort bestätigen</label>
                <div className="relative">
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    required
                    placeholder="••••••••"
                    className="input-dark pl-10"
                  />
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                </div>
              </div>
            )}

            {tab === 'register' && (
              <div className="flex items-start gap-3">
                <input type="checkbox" required className="mt-0.5 accent-brand-purple" />
                <span className="text-white/50 text-sm">
                  Ich stimme den{' '}
                  <a href="#" className="text-brand-purple hover:underline">AGB</a>{' '}
                  und der{' '}
                  <a href="#" className="text-brand-purple hover:underline">Datenschutzerklärung</a>{' '}
                  zu.
                </span>
              </div>
            )}

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base mt-2">
              {tab === 'login' ? 'Anmelden' : 'Konto erstellen'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">oder weiter mit</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Google', icon: '🔵' },
              { label: 'Apple', icon: '🍎' },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-sm font-medium transition-all"
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
