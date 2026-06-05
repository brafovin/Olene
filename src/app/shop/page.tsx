import { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-white/50">Lade Produkte...</div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
