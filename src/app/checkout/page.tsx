'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Lock, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { productPhotoUrl, productPlaceholder } from '@/lib/productImage';

type Step = 'address' | 'payment' | 'confirm';

const PAYMENT_METHODS = [
  { id: 'paypal',  label: 'PayPal',      icon: '💳', desc: 'Schnell & sicher mit PayPal bezahlen' },
  { id: 'card',    label: 'Kreditkarte', icon: '💳', desc: 'Visa, Mastercard, American Express' },
  { id: 'klarna',  label: 'Klarna',      icon: '🛒', desc: 'Jetzt kaufen, später zahlen' },
  { id: 'apple',   label: 'Apple Pay',   icon: '🍎', desc: 'Touch ID oder Face ID verwenden' },
  { id: 'google',  label: 'Google Pay',  icon: '🔵', desc: 'Schnell mit Google Pay bezahlen' },
];

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>('address');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [ordered, setOrdered] = useState(false);
  const [agbChecked, setAgbChecked] = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: 'Deutschland',
  });
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '' });

  // show errors only after the user tries to advance
  const [showAddrErr, setShowAddrErr] = useState(false);
  const [showCardErr, setShowCardErr] = useState(false);
  const [showAgbErr, setShowAgbErr]  = useState(false);

  const shipping = totalPrice >= 79 ? 0 : 4.99;
  const total    = totalPrice + shipping;

  const updateForm = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const updateCard = (k: keyof typeof cardForm, v: string) => setCardForm((f) => ({ ...f, [k]: v }));

  // ----- Validation -----
  const addrErr = {
    firstName: !form.firstName.trim(),
    lastName:  !form.lastName.trim(),
    email:     !form.email.trim() || !isEmail(form.email),
    address:   !form.address.trim(),
    zip:       !form.zip.trim(),
    city:      !form.city.trim(),
  };
  const cardErr = {
    number: !cardForm.number.trim(),
    expiry: !cardForm.expiry.trim(),
    cvv:    !cardForm.cvv.trim(),
  };

  const handleAddressNext = () => {
    if (Object.values(addrErr).some(Boolean)) {
      setShowAddrErr(true);
      return;
    }
    setShowAddrErr(false);
    setStep('payment');
  };

  const handlePaymentNext = () => {
    if (paymentMethod === 'card' && Object.values(cardErr).some(Boolean)) {
      setShowCardErr(true);
      return;
    }
    setShowCardErr(false);
    setStep('confirm');
  };

  const handleOrder = () => {
    if (!agbChecked) {
      setShowAgbErr(true);
      return;
    }
    clearCart();
    setOrdered(true);
  };

  // ----- helpers -----
  function fieldClass(invalid: boolean, show: boolean) {
    return `input-dark ${show && invalid ? 'border border-red-500/70 focus:border-red-500' : ''}`;
  }
  function Err({ show, msg }: { show: boolean; msg: string }) {
    if (!show) return null;
    return <p className="text-red-400 text-xs mt-1">{msg}</p>;
  }

  // ----- Success screen -----
  if (ordered) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold text-white mb-3">Bestellung bestätigt!</h1>
            <p className="text-white/60 leading-relaxed">
              Vielen Dank für deine Bestellung! Du erhältst in Kürze eine Bestätigungs-E-Mail mit deiner Bestellnummer.
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-white/10 p-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Bestellnummer</span>
              <span className="text-white font-mono font-semibold">#OLENE-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Voraussichtliche Lieferung</span>
              <span className="text-white">1–3 Werktage</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/shop" className="btn-primary flex-1 flex items-center justify-center gap-2">Weiter shoppen</Link>
            <Link href="/account" className="btn-outline flex-1 flex items-center justify-center">Mein Konto</Link>
          </div>
        </div>
      </div>
    );
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'address', label: 'Adresse' },
    { key: 'payment', label: 'Zahlung' },
    { key: 'confirm', label: 'Bestätigung' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/cart" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück
          </Link>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Lock size={14} />
            Sichere Verbindung
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-8">Kasse</h1>

        {/* Progress */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step === s.key
                      ? 'text-white'
                      : steps.findIndex((x) => x.key === step) > i
                      ? 'bg-green-500 text-white'
                      : 'bg-surface-3 text-white/30 border border-white/10'
                  }`}
                  style={step === s.key ? { background: 'linear-gradient(135deg, #8A2BE2, #00AEEF)' } : undefined}
                >
                  {steps.findIndex((x) => x.key === step) > i ? '✓' : i + 1}
                </div>
                <span className={`text-sm hidden sm:block ${step === s.key ? 'text-white font-medium' : 'text-white/30'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-white/10 mx-3" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">

            {/* ── STEP 1: ADDRESS ── */}
            {step === 'address' && (
              <div className="bg-surface rounded-2xl border border-white/10 p-8 space-y-6">
                <h2 className="text-white font-semibold text-xl">Lieferadresse</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Vorname *</label>
                    <input value={form.firstName} onChange={(e) => updateForm('firstName', e.target.value)}
                      className={fieldClass(addrErr.firstName, showAddrErr)} placeholder="Max" />
                    <Err show={showAddrErr && addrErr.firstName} msg="Bitte Vorname eingeben" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Nachname *</label>
                    <input value={form.lastName} onChange={(e) => updateForm('lastName', e.target.value)}
                      className={fieldClass(addrErr.lastName, showAddrErr)} placeholder="Mustermann" />
                    <Err show={showAddrErr && addrErr.lastName} msg="Bitte Nachname eingeben" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1.5">E-Mail *</label>
                  <input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)}
                    className={fieldClass(addrErr.email, showAddrErr)} placeholder="max@example.de" />
                  <Err show={showAddrErr && addrErr.email} msg="Bitte gültige E-Mail-Adresse eingeben" />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Telefon</label>
                  <input value={form.phone} onChange={(e) => updateForm('phone', e.target.value)}
                    className="input-dark" placeholder="+49 123 456 7890" />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Straße & Hausnummer *</label>
                  <input value={form.address} onChange={(e) => updateForm('address', e.target.value)}
                    className={fieldClass(addrErr.address, showAddrErr)} placeholder="Musterstraße 1" />
                  <Err show={showAddrErr && addrErr.address} msg="Bitte Adresse eingeben" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">PLZ *</label>
                    <input value={form.zip} onChange={(e) => updateForm('zip', e.target.value)}
                      className={fieldClass(addrErr.zip, showAddrErr)} placeholder="12345" />
                    <Err show={showAddrErr && addrErr.zip} msg="PLZ erforderlich" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-white/60 mb-1.5">Stadt *</label>
                    <input value={form.city} onChange={(e) => updateForm('city', e.target.value)}
                      className={fieldClass(addrErr.city, showAddrErr)} placeholder="Berlin" />
                    <Err show={showAddrErr && addrErr.city} msg="Bitte Stadt eingeben" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Land</label>
                  <select value={form.country} onChange={(e) => updateForm('country', e.target.value)}
                    className="input-dark bg-surface-2">
                    {['Deutschland', 'Österreich', 'Schweiz'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <button onClick={handleAddressNext} className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                  Weiter zur Zahlung
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* ── STEP 2: PAYMENT ── */}
            {step === 'payment' && (
              <div className="bg-surface rounded-2xl border border-white/10 p-8 space-y-6">
                <h2 className="text-white font-semibold text-xl">Zahlungsmethode</h2>

                <div className="space-y-3">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === m.id
                          ? 'border-brand-purple bg-brand-purple/10'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <input type="radio" name="payment" value={m.id}
                        checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)}
                        className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        paymentMethod === m.id ? 'border-brand-purple' : 'border-white/30'
                      }`}>
                        {paymentMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-purple" />}
                      </div>
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <div className="text-white font-semibold text-sm">{m.label}</div>
                        <div className="text-white/40 text-xs">{m.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-surface-2 rounded-xl border border-white/10">
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">Kartennummer *</label>
                      <div className="relative">
                        <input value={cardForm.number}
                          onChange={(e) => updateCard('number', e.target.value)}
                          className={`${fieldClass(cardErr.number, showCardErr)} pl-10`}
                          placeholder="1234 5678 9012 3456" />
                        <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                      </div>
                      <Err show={showCardErr && cardErr.number} msg="Bitte Kartennummer eingeben" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-1.5">Gültigkeit *</label>
                        <input value={cardForm.expiry}
                          onChange={(e) => updateCard('expiry', e.target.value)}
                          className={fieldClass(cardErr.expiry, showCardErr)} placeholder="MM/JJ" />
                        <Err show={showCardErr && cardErr.expiry} msg="Ablaufdatum erforderlich" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/60 mb-1.5">CVV *</label>
                        <input value={cardForm.cvv}
                          onChange={(e) => updateCard('cvv', e.target.value)}
                          className={fieldClass(cardErr.cvv, showCardErr)} placeholder="123" />
                        <Err show={showCardErr && cardErr.cvv} msg="CVV erforderlich" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep('address')} className="btn-outline flex-1 py-3">Zurück</button>
                  <button onClick={handlePaymentNext} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
                    Weiter
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: CONFIRM ── */}
            {step === 'confirm' && (
              <div className="bg-surface rounded-2xl border border-white/10 p-8 space-y-6">
                <h2 className="text-white font-semibold text-xl">Bestellung bestätigen</h2>

                <div className="space-y-4">
                  <div className="p-4 bg-surface-2 rounded-xl border border-white/10">
                    <h3 className="text-white/60 text-xs uppercase tracking-widest mb-2">Lieferadresse</h3>
                    <p className="text-white text-sm">{form.firstName} {form.lastName}</p>
                    <p className="text-white/60 text-sm">{form.address}, {form.zip} {form.city}</p>
                    <p className="text-white/60 text-sm">{form.country}</p>
                  </div>
                  <div className="p-4 bg-surface-2 rounded-xl border border-white/10">
                    <h3 className="text-white/60 text-xs uppercase tracking-widest mb-2">Zahlungsmethode</h3>
                    <p className="text-white text-sm">
                      {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agb"
                      checked={agbChecked}
                      onChange={(e) => { setAgbChecked(e.target.checked); setShowAgbErr(false); }}
                      className={`mt-0.5 accent-brand-purple ${showAgbErr && !agbChecked ? 'outline outline-red-500/70 rounded' : ''}`}
                    />
                    <label htmlFor="agb" className="text-white/60 text-sm cursor-pointer">
                      Ich stimme den{' '}
                      <a href="#" className="text-brand-purple hover:underline">AGB</a>{' '}
                      und der{' '}
                      <a href="#" className="text-brand-purple hover:underline">Datenschutzerklärung</a>{' '}
                      zu. *
                    </label>
                  </div>
                  {showAgbErr && !agbChecked && (
                    <p className="text-red-400 text-xs ml-6">Bitte AGB & Datenschutz akzeptieren</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep('payment')} className="btn-outline flex-1 py-3">Zurück</button>
                  <button onClick={handleOrder} className="btn-primary flex-1 flex items-center justify-center gap-2 py-4 text-base">
                    <Lock size={18} />
                    Jetzt kaufen · {formatPrice(total)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-surface rounded-2xl border border-white/10 p-6">
              <h3 className="text-white font-semibold mb-4">Deine Bestellung</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-lg flex-shrink-0 overflow-hidden relative bg-surface-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={productPlaceholder(item.product)}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={productPhotoUrl(item.product.imageId, 96, 112)}
                        alt={item.product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-medium truncate">{item.product.name}</div>
                      <div className="text-white/40 text-xs">×{item.quantity}</div>
                    </div>
                    <div className="text-white text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Zwischensumme</span><span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Versand</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                  <span>Gesamt</span><span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
              <Lock size={12} />
              SSL-gesicherte Verbindung
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
