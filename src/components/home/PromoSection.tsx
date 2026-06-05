import Link from 'next/link';
import { ArrowRight, Zap, Truck, RotateCcw, Shield } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Gratis Versand', desc: 'Ab 79 € kostenloser Versand' },
  { icon: RotateCcw, title: 'Kostenlos Retour', desc: '30 Tage Rückgaberecht' },
  { icon: Shield, title: 'Sicher bezahlen', desc: 'SSL-geschützt & vertrauenswürdig' },
  { icon: Zap, title: 'Schnelle Lieferung', desc: '1–3 Werktage express' },
];

export default function PromoSection() {
  return (
    <section className="py-16 bg-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-brand-purple" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{title}</div>
                <div className="text-white/40 text-xs mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Banner */}
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16"
          style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1b3e 50%, #0a2a1a 100%)' }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8A2BE2 0%, transparent 70%)' }}
          />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, #00AEEF 0%, transparent 70%)' }}
          />

          <div className="relative text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm text-white/80">
              <Zap size={14} className="text-yellow-400" />
              Limitiertes Angebot – Nur solange der Vorrat reicht!
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
              Bis zu <span className="gradient-text">30% Sale</span>
            </h2>
            <p className="text-white/60 text-lg max-w-lg mx-auto">
              Die besten Sommer-Styles zu unschlagbaren Preisen. Schnell sein lohnt sich!
            </p>
            <Link href="/shop?badge=Sale" className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-lg">
              Sale entdecken
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
