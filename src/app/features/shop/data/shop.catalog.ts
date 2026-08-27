import { PRODUCT_DETAILS } from '../../../core/data/products.data';
import type { ProductDetail } from '../../../core/data/product-detail.model';

export interface ShopListingProduct {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly image: string;
  readonly alt: string;
  readonly slug: string;
}

const TITLE_MAP: Readonly<Record<string, string>> = {
  shop: 'Shop All',
  men: 'Men',
  women: 'Women',
  children: 'Children',
  formal: 'Formal',
  casual: 'Casual',
  sandal: 'Sandal',
  flats: 'Flats',
  heels: 'Heels',
  closed: 'Closed',
  boys: 'Boys Shoes',
  girls: 'Girls Shoes',
  sports: 'Sports',
};

export function buildShopPath(
  category: string | null,
  subcategory: string | null,
): string {
  if (!category) {
    return '/shop';
  }
  if (!subcategory) {
    return `/shop/${category}`;
  }
  return `/shop/${category}/${subcategory}`;
}

export function shopTitleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length <= 1) {
    return 'Shop All';
  }
  const last = segments[segments.length - 1] ?? 'shop';
  return TITLE_MAP[last] ?? last.replace(/-/g, ' ');
}

/**
 * Match products by categoryPath prefix.
 * Empty subcategory with no hits falls back to the parent category.
 */
export function getProductsByShopPath(path: string): readonly ProductDetail[] {
  const normalized = path.replace(/\/$/, '') || '/shop';

  if (normalized === '/shop') {
    return PRODUCT_DETAILS;
  }

  const exact = PRODUCT_DETAILS.filter(
    (product) =>
      product.categoryPath === normalized ||
      product.categoryPath.startsWith(`${normalized}/`),
  );

  if (exact.length > 0) {
    return exact;
  }

  const parts = normalized.split('/').filter(Boolean);
  if (parts.length >= 3) {
    const parent = `/${parts.slice(0, 2).join('/')}`;
    return PRODUCT_DETAILS.filter(
      (product) =>
        product.categoryPath === parent ||
        product.categoryPath.startsWith(`${parent}/`),
    );
  }

  return [];
}

export function filterProductsByQuery(
  products: readonly ProductDetail[],
  query: string,
): readonly ProductDetail[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return products;
  }

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.productCode.toLowerCase().includes(q),
  );
}

export function toListingProducts(
  products: readonly ProductDetail[],
): readonly ShopListingProduct[] {
  return products.map((product) => ({
    id: product.slug,
    name: product.name,
    price: product.price,
    currency: product.currency,
    image: product.images[0]?.src ?? '',
    alt: product.images[0]?.alt ?? product.name,
    slug: product.slug,
  }));
}
