import { Product, Category } from '@/types';

/**
 * Real product photo from the Unsplash CDN.
 */
export function productPhotoUrl(imageId: string, w = 600, h = 800): string {
  return `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

/**
 * Garment silhouettes (drawn in a 100×100 box) — one per category so the
 * fallback illustration always visually matches what the product is.
 */
const GARMENTS: Record<Category, string> = {
  // Dress
  Sommerkleider:
    'M50 14 L43 19 L37 17 L31 25 L40 31 L38 42 Q29 62 31 84 L69 84 Q71 62 62 42 L60 31 L69 25 L63 17 L57 19 Z',
  // T-shirt / top
  'Tops & T-Shirts':
    'M50 22 L41 19 L31 25 L25 35 L33 43 L37 41 L37 64 L63 64 L63 41 L67 43 L75 35 L69 25 L59 19 Z',
  // Shorts
  Shorts:
    'M30 32 L70 32 L70 70 L54 70 L50 48 L46 70 L30 70 Z',
  // A-line skirt
  'Röcke':
    'M36 30 L64 30 L76 80 L24 80 Z',
  // Two-piece set (top + shorts)
  'Zweiteilige Sets':
    'M50 14 L42 11 L33 17 L27 26 L34 33 L38 31 L38 46 L62 46 L62 31 L66 33 L73 26 L67 17 L58 11 Z ' +
    'M36 54 L64 54 L64 84 L54 84 L50 64 L46 84 L36 84 Z',
  // Bikini
  'Strand-Outfits':
    'M28 36 Q39 31 48 37 Q43 47 30 46 Q27 41 28 36 Z ' +
    'M72 36 Q61 31 52 37 Q57 47 70 46 Q73 41 72 36 Z ' +
    'M40 60 L60 60 Q57 78 50 80 Q43 78 40 60 Z',
  // Handbag
  Accessoires:
    'M34 44 L66 44 L70 84 L30 84 Z ' +
    'M40 44 Q40 28 50 28 Q60 28 60 44 L56 44 Q56 32 50 32 Q44 32 44 44 Z',
};

function garmentPath(category: Category): string {
  return GARMENTS[category] ?? GARMENTS['Sommerkleider'];
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Split a long name into max two balanced lines so it fits the tile. */
function wrapName(name: string): string[] {
  if (name.length <= 16) return [name];
  const mid = Math.floor(name.length / 2);
  let split = -1;
  let best = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < name.length; i++) {
    if (name[i] === ' ') {
      const d = Math.abs(i - mid);
      if (d < best) {
        best = d;
        split = i;
      }
    }
  }
  if (split === -1) return [name];
  return [name.slice(0, split), name.slice(split + 1)];
}

/**
 * A self-contained SVG "lookbook" tile for a product: the product's own
 * colors as the background gradient, a category-matched garment silhouette,
 * and the product name. Always renders — needs no network — so every product
 * is guaranteed a fitting image even if its photo fails to load.
 */
export function productPlaceholder(product: Product): string {
  const cols = product.colors.map((c) => c.hex);
  const c0 = cols[0] ?? '#8A2BE2';
  const c1 = cols[1] ?? c0;
  const c2 = cols[2] ?? c1;

  const path = garmentPath(product.category);
  const lines = wrapName(product.name);
  const nameSvg = lines
    .map(
      (ln, i) =>
        `<text x='150' y='${(lines.length === 1 ? 338 : 324) + i * 26}' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='23' font-weight='700' fill='#ffffff'>${escapeXml(
          ln
        )}</text>`
    )
    .join('');

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400' preserveAspectRatio='xMidYMid slice'>` +
    `<defs>` +
    `<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0%' stop-color='${c0}'/><stop offset='50%' stop-color='${c1}'/><stop offset='100%' stop-color='${c2}'/>` +
    `</linearGradient>` +
    `<radialGradient id='glow' cx='50%' cy='34%' r='60%'>` +
    `<stop offset='0%' stop-color='#ffffff' stop-opacity='0.35'/><stop offset='100%' stop-color='#ffffff' stop-opacity='0'/>` +
    `</radialGradient>` +
    `<linearGradient id='shade' x1='0' y1='0' x2='0' y2='1'>` +
    `<stop offset='55%' stop-color='#000000' stop-opacity='0'/><stop offset='100%' stop-color='#000000' stop-opacity='0.55'/>` +
    `</linearGradient>` +
    `</defs>` +
    `<rect width='300' height='400' fill='url(#g)'/>` +
    `<rect width='300' height='400' fill='url(#glow)'/>` +
    `<g transform='translate(50,58) scale(2)'><path d='${path}' fill='#ffffff' fill-opacity='0.92' fill-rule='evenodd'/></g>` +
    `<rect width='300' height='400' fill='url(#shade)'/>` +
    `<text x='22' y='34' font-family='Inter, Arial, sans-serif' font-size='15' font-weight='700' letter-spacing='3' fill='#ffffff' fill-opacity='0.85'>OLENE</text>` +
    nameSvg +
    `<text x='150' y='372' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='12' letter-spacing='2' fill='#ffffff' fill-opacity='0.7'>${escapeXml(
      product.category.toUpperCase()
    )}</text>` +
    `</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
