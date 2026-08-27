import { RenderMode, ServerRoute } from '@angular/ssr';

const SHOP_CATEGORIES = ['men', 'women', 'children'] as const;

const SHOP_SUBCATEGORIES: readonly { category: string; subcategory: string }[] =
  [
    { category: 'men', subcategory: 'formal' },
    { category: 'men', subcategory: 'casual' },
    { category: 'men', subcategory: 'sandal' },
    { category: 'women', subcategory: 'flats' },
    { category: 'women', subcategory: 'heels' },
    { category: 'women', subcategory: 'closed' },
    { category: 'children', subcategory: 'boys' },
    { category: 'children', subcategory: 'girls' },
    { category: 'children', subcategory: 'sports' },
  ];

/** Keep in sync with product slugs in `core/data/products.data.ts`. */
const PRODUCT_SLUGS = [
  'men-dress---slip-on---zen-238546001',
  'men-casual---casual-basic---softened-238546053',
  'men-summer---sandal---steller-238546010',
  'men-summer---sandal---steller-238546011',
  'ladies-open-heel---slip-on---perlita-238546020',
  'ladies-open-heel---sandal---nora-248544801',
  'ladies-closed---mid-heel---nora-248544802',
  'men-summer---sandal---steller-248544803',
  'ladies-open-heel---slip-on---namira-248544804',
  'ladies-closed---mid-heel---camellia-248544805',
  'men-summer---sandal---steller-248544806',
  'sport-kids---kids-running---genesis-258546001',
  'sport-kids---kids-lifestyle---play-258546002',
  'sport-mens---mens-lifestyle---pulse-258546003',
] as const;

export const serverRoutes: ServerRoute[] = [
  {
    path: 'shop/:category',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SHOP_CATEGORIES.map((category) => ({ category }));
    },
  },
  {
    path: 'shop/:category/:subcategory',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [...SHOP_SUBCATEGORIES];
    },
  },
  {
    path: 'product-details/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PRODUCT_SLUGS.map((slug) => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
