export interface ProductImage {
  readonly src: string;
  readonly alt: string;
}

export interface ProductSpec {
  readonly label: string;
  readonly value: string;
}

export interface ProductDetail {
  readonly slug: string;
  readonly name: string;
  readonly productCode: string;
  readonly price: number;
  readonly currency: string;
  readonly category: string;
  readonly categoryPath: string;
  readonly brand: string;
  readonly images: readonly ProductImage[];
  readonly sizes: readonly string[];
  readonly inStock: boolean;
  readonly specs: readonly ProductSpec[];
  readonly description: string;
  readonly shippingNote: string;
}

export type ProductAccordionId = 'description' | 'features' | 'shipping';
