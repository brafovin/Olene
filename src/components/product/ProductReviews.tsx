'use client';

import { useState } from 'react';
import { CheckCircle, ThumbsUp } from 'lucide-react';
import { Review } from '@/types';
import StarRating from '@/components/ui/StarRating';

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sophie M.',
    avatar: 'SM',
    rating: 5,
    comment: 'Absolut traumhaftes Produkt! Die Qualität ist top und die Farben sind noch schöner als auf den Fotos. Habe so viele Komplimente bekommen!',
    date: '2025-05-15',
    verified: true,
  },
  {
    id: 'r2',
    author: 'Lena K.',
    avatar: 'LK',
    rating: 5,
    comment: 'Perfekte Passform in Größe S. Das Material ist angenehm leicht für heiße Tage. Sehr empfehlenswert!',
    date: '2025-04-28',
    verified: true,
  },
  {
    id: 'r3',
    author: 'Maya R.',
    avatar: 'MR',
    rating: 4,
    comment: 'Schönes Produkt, fällt aber etwas kleiner aus. Empfehle eine Größe größer zu bestellen.',
    date: '2025-04-10',
    verified: false,
  },
  {
    id: 'r4',
    author: 'Julia F.',
    avatar: 'JF',
    rating: 5,
    comment: 'Ich bin total verliebt! Schnelle Lieferung, super Qualität. Kaufe definitiv wieder!',
    date: '2025-03-22',
    verified: true,
  },
];

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  reviews?: Review[];
}

export default function ProductReviews({ rating, reviewCount, reviews = DEFAULT_REVIEWS }: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 3);

  const dist = [
    { stars: 5, pct: 68 },
    { stars: 4, pct: 20 },
    { stars: 3, pct: 8 },
    { stars: 2, pct: 3 },
    { stars: 1, pct: 1 },
  ];

  return (
    <section id="reviews" className="py-12 border-t border-white/10">
      <h2 className="font-display text-3xl font-bold text-white mb-8">Kundenbewertungen</h2>

      <div className="grid md:grid-cols-3 gap-10 mb-10">
        {/* Summary */}
        <div className="flex flex-col items-center justify-center text-center p-8 bg-surface rounded-2xl border border-white/10">
          <div className="text-7xl font-bold gradient-text">{rating}</div>
          <StarRating rating={rating} size="lg" className="justify-center my-3" />
          <div className="text-white/50 text-sm">{reviewCount} Bewertungen</div>
        </div>

        {/* Distribution */}
        <div className="md:col-span-2 space-y-3 justify-center flex flex-col">
          {dist.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-14 text-sm text-white/60">
                <span>{stars}</span>
                <span className="text-yellow-400">★</span>
              </div>
              <div className="flex-1 h-2 bg-surface-3 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #8A2BE2, #00AEEF)' }}
                />
              </div>
              <span className="text-white/40 text-xs w-8">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {visible.map((review) => (
          <div key={review.id} className="p-6 bg-surface rounded-2xl border border-white/5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #8A2BE2, #00AEEF)' }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{review.author}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-green-400">
                        <CheckCircle size={12} />
                        Verifizierter Kauf
                      </span>
                    )}
                  </div>
                  <StarRating rating={review.rating} size="sm" className="mt-0.5" />
                </div>
              </div>
              <span className="text-white/30 text-xs">
                {new Date(review.date).toLocaleDateString('de-DE')}
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{review.comment}</p>
            <button className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs mt-3 transition-colors">
              <ThumbsUp size={12} />
              Hilfreich
            </button>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full py-3 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm font-medium transition-all"
        >
          {showAll ? 'Weniger anzeigen' : `Alle ${reviews.length} Bewertungen anzeigen`}
        </button>
      )}
    </section>
  );
}
