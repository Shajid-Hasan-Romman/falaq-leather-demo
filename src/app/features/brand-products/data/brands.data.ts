export interface BrandInfo {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly logo: string;
}

export interface BrandProduct {
  readonly id: string;
  readonly brandId: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly image: string;
  readonly alt: string;
  /** Links to /product-details/:slug */
  readonly slug: string;
}

/** Query param value on /products?shop_our_brand=… */
export type ShopOurBrandId =
  | 'elegante'
  | 'lara-clara'
  | 'bay-soft'
  | 'striker';

export const SHOP_BRANDS: readonly BrandInfo[] = [
  {
    id: 'elegante',
    name: 'ELEGANTE',
    description: 'Classic, posh but decent stylish segment.',
    logo: '/asset/brands/elegante.png',
  },
  {
    id: 'lara-clara',
    name: 'LARA CLARA',
    description: 'Talks about the blending of fashion & latest trends.',
    logo: '/asset/brands/lara-clara.png',
  },
  {
    id: 'bay-soft',
    name: 'BAY SOFT',
    description: 'Comfortable high quality leather footwear',
    logo: '/asset/brands/bay-soft.png',
  },
  {
    id: 'striker',
    name: 'STRIKER',
    description: 'Healthy Lifestyle',
    logo: '/asset/brands/striker.png',
  },
];

/**
 * Brand-scoped product cards for the /products listing.
 * Slugs must exist in product-details catalog.
 */
export const BRAND_PRODUCTS: readonly BrandProduct[] = [
  // —— ELEGANTE ——
  {
    id: 'elegante-zen',
    brandId: 'elegante',
    name: 'Men Dress - Slip On - Zen',
    price: 6990,
    currency: 'BDT',
    image: '/asset/products/zen/new_0091__DSC2432%20(1).jpg',
    alt: 'Men Dress Slip On Zen',
    slug: 'men-dress---slip-on---zen-238546001',
  },

  // —— LARA CLARA ——
  {
    id: 'lara-perlita',
    brandId: 'lara-clara',
    name: 'Ladies Open Heel - Slip On - Perlita',
    price: 2290,
    currency: 'BDT',
    image: '/asset/products/parlita/_DSC2087.jpg',
    alt: 'Ladies Open Heel Perlita',
    slug: 'ladies-open-heel---slip-on---perlita-238546020',
  },
  {
    id: 'lara-nora-sandal',
    brandId: 'lara-clara',
    name: 'Ladies Open Heel - Sandal - Nora',
    price: 4490,
    currency: 'BDT',
    image: '/asset/product-category/Hill/_DSC7878_2Zi53ga.jpg',
    alt: 'Ladies Open Heel Sandal Nora',
    slug: 'ladies-open-heel---sandal---nora-248544801',
  },
  {
    id: 'lara-nora-mid',
    brandId: 'lara-clara',
    name: 'Ladies Closed - Mid Heel - Nora',
    price: 3490,
    currency: 'BDT',
    image: '/asset/product-category/hill%202/_DSC9480.jpg',
    alt: 'Ladies Closed Mid Heel Nora',
    slug: 'ladies-closed---mid-heel---nora-248544802',
  },
  {
    id: 'lara-namira',
    brandId: 'lara-clara',
    name: 'Ladies Open Heel - Slip On - Namira',
    price: 3990,
    currency: 'BDT',
    image:
      '/asset/product-category/Hill%203/_DSC5597_0001_Resize_Website_0001__DSC4318.jpg',
    alt: 'Ladies Open Heel Slip On Namira',
    slug: 'ladies-open-heel---slip-on---namira-248544804',
  },
  {
    id: 'lara-camellia',
    brandId: 'lara-clara',
    name: 'Ladies Closed - Mid Heel - Camellia',
    price: 1990,
    currency: 'BDT',
    image: '/asset/product-category/Hill%204/_DSC9522.jpg',
    alt: 'Ladies Closed Mid Heel Camellia',
    slug: 'ladies-closed---mid-heel---camellia-248544805',
  },

  // —— BAY SOFT ——
  {
    id: 'bay-softened',
    brandId: 'bay-soft',
    name: 'Men Casual - Casual Basic - Softened',
    price: 3490,
    currency: 'BDT',
    image: '/asset/products/softend/DSC4911_000.jpg',
    alt: 'Men Casual Softened',
    slug: 'men-casual---casual-basic---softened-238546053',
  },
  {
    id: 'bay-steller-mule',
    brandId: 'bay-soft',
    name: 'Men Summer - Sandal - Steller',
    price: 2490,
    currency: 'BDT',
    image: '/asset/products/steller/_DSC2291.jpg',
    alt: 'Men Summer Sandal Steller',
    slug: 'men-summer---sandal---steller-238546010',
  },
  {
    id: 'bay-steller-toe',
    brandId: 'bay-soft',
    name: 'Men Summer - Sandal - Steller',
    price: 1790,
    currency: 'BDT',
    image: '/asset/products/sandal/_DSC2285.jpg',
    alt: 'Men Summer Sandal Steller toe-post',
    slug: 'men-summer---sandal---steller-238546011',
  },
  {
    id: 'bay-steller-slide',
    brandId: 'bay-soft',
    name: 'Men Summer - Sandal - Steller',
    price: 1890,
    currency: 'BDT',
    image: '/asset/product-category/sandel/_DSC2337.jpg',
    alt: 'Men Summer Sandal Steller slide',
    slug: 'men-summer---sandal---steller-248544803',
  },
  {
    id: 'bay-steller-open',
    brandId: 'bay-soft',
    name: 'Men Summer - Sandal - Steller',
    price: 2490,
    currency: 'BDT',
    image: '/asset/product-category/Sandel%202/_DSC9586.jpg',
    alt: 'Men Summer Sandal Steller mule',
    slug: 'men-summer---sandal---steller-248544806',
  },

  // —— STRIKER ——
  {
    id: 'striker-genesis-kids',
    brandId: 'striker',
    name: 'Sport Kids - Kids Running - Genesis',
    price: 2490,
    currency: 'BDT',
    image: '/asset/children/Kids-Shoe-1.jpg',
    alt: 'Striker kids running shoe',
    slug: 'sport-kids---kids-running---genesis-258546001',
  },
  {
    id: 'striker-play',
    brandId: 'striker',
    name: 'Sport Kids - Kids Lifestyle - Play',
    price: 1990,
    currency: 'BDT',
    image: '/asset/children/Kids-3.jpg',
    alt: 'Striker kids lifestyle shoe',
    slug: 'sport-kids---kids-lifestyle---play-258546002',
  },
  {
    id: 'striker-casual',
    brandId: 'striker',
    name: 'Sport Mens - Mens Lifestyle - Pulse',
    price: 3290,
    currency: 'BDT',
    image: '/asset/children/Men-Casual-2.jpg',
    alt: 'Striker mens lifestyle sneaker',
    slug: 'sport-mens---mens-lifestyle---pulse-258546003',
  },
];

export function findBrandById(id: string): BrandInfo | undefined {
  return SHOP_BRANDS.find((brand) => brand.id === id);
}

export function getProductsByBrandId(brandId: string): readonly BrandProduct[] {
  return BRAND_PRODUCTS.filter((product) => product.brandId === brandId);
}

export function isShopOurBrandId(value: string): value is ShopOurBrandId {
  return SHOP_BRANDS.some((brand) => brand.id === value);
}
