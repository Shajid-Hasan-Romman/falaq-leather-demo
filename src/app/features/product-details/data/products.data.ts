import type { ProductDetail } from '../models/product-detail.model';

/**
 * First image in each `images` array is the Featured Products card shot.
 * Remaining images follow gallery sequence (angles → top → back/sole).
 */
export const PRODUCT_DETAILS: readonly ProductDetail[] = [
  {
    slug: 'men-dress---slip-on---zen-238546001',
    name: 'Men Dress - Slip On - Zen',
    productCode: '238546001',
    price: 6990,
    currency: 'BDT',
    category: 'Men Dress / Slip On',
    categoryPath: '/shop/men/formal',
    brand: 'Elegante',
    images: [
      {
        src: '/asset/products/zen/new_0091__DSC2432%20(1).jpg',
        alt: 'Zen — side view',
      },
      {
        src: '/asset/products/zen/new_0089__DSC2437.jpg',
        alt: 'Zen — pair view',
      },
      {
        src: '/asset/products/zen/new_0092__DSC2431.jpg',
        alt: 'Zen — three-quarter view',
      },
      {
        src: '/asset/products/zen/new_0088__DSC2438.jpg',
        alt: 'Zen — toe detail',
      },
      {
        src: '/asset/products/zen/new_0064__DSC2585.jpg',
        alt: 'Zen — top view',
      },
      {
        src: '/asset/products/zen/new_0090__DSC2434.jpg',
        alt: 'Zen — sole',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Men Dress / Slip On' },
      { label: 'Article Type', value: 'Dress Slip On' },
      { label: 'Material', value: 'Full-grain leather' },
      { label: 'Color Base', value: 'Brown' },
      { label: 'Brand', value: 'Elegante' },
    ],
    description:
      'Refined dress slip-on crafted for formal occasions, with a polished leather finish and classic silhouette.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'men-casual---casual-basic---softened-238546053',
    name: 'Men Casual - Casual Basic - Softened',
    productCode: '238546053',
    price: 3490,
    currency: 'BDT',
    category: 'Men Casual / Casual Basic',
    categoryPath: '/shop/men/casual',
    brand: 'Bay Soft',
    images: [
      {
        src: '/asset/products/softend/DSC4911_000.jpg',
        alt: 'Softened — three-quarter view',
      },
      {
        src: '/asset/products/softend/DSC4911.jpg',
        alt: 'Softened — side view',
      },
      {
        src: '/asset/products/softend/DSC4911_.jpg',
        alt: 'Softened — top view',
      },
      {
        src: '/asset/products/softend/DSC4911_0.jpg',
        alt: 'Softened — sole',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Men Casual / Casual Basic' },
      { label: 'Article Type', value: 'Slip On / Moccasin' },
      { label: 'Material', value: 'Soft leather' },
      { label: 'Color Base', value: 'Black' },
      { label: 'Brand', value: 'Bay Soft' },
    ],
    description:
      'Everyday casual slip-on with a soft leather upper, moc-toe stitching, and a flexible ribbed sole for all-day comfort.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'men-summer---sandal---steller-238546010',
    name: 'Men Summer - Sandal - Steller',
    productCode: '238546010',
    price: 2490,
    currency: 'BDT',
    category: 'Men Summer / Sandal',
    categoryPath: '/shop/men/sandal',
    brand: 'Bay Soft',
    images: [
      {
        src: '/asset/products/steller/_DSC2291.jpg',
        alt: 'Steller — pair view',
      },
      {
        src: '/asset/products/steller/_DSC2292.jpg',
        alt: 'Steller — side view',
      },
      {
        src: '/asset/products/steller/_DSC2295.jpg',
        alt: 'Steller — top view',
      },
      {
        src: '/asset/products/steller/_DSC2290.jpg',
        alt: 'Steller — back view',
      },
      {
        src: '/asset/products/steller/_DSC2293.jpg',
        alt: 'Steller — detail view',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Men Summer / Sandal' },
      { label: 'Article Type', value: 'Sandal / Mule' },
      { label: 'Material', value: 'Leather' },
      { label: 'Color Base', value: 'Brown' },
      { label: 'Brand', value: 'Bay Soft' },
    ],
    description:
      'Lightweight summer sandal with a clean leather upper and easy slip-on wear for warm-weather days.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'men-summer---sandal---steller-238546011',
    name: 'Men Summer - Sandal - Steller',
    productCode: '238546011',
    price: 1790,
    currency: 'BDT',
    category: 'Men Summer / Sandal',
    categoryPath: '/shop/men/sandal',
    brand: 'Bay Soft',
    images: [
      {
        src: '/asset/products/sandal/_DSC2285.jpg',
        alt: 'Steller toe-post — pair view',
      },
      {
        src: '/asset/products/sandal/_DSC2284.jpg',
        alt: 'Steller toe-post — top view',
      },
      {
        src: '/asset/products/sandal/_DSC2287.jpg',
        alt: 'Steller toe-post — side view',
      },
      {
        src: '/asset/products/sandal/_DSC2286.jpg',
        alt: 'Steller toe-post — alternate angle',
      },
      {
        src: '/asset/products/sandal/_DSC2288.jpg',
        alt: 'Steller toe-post — back view',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Men Summer / Sandal' },
      { label: 'Article Type', value: 'Toe-post Sandal' },
      { label: 'Material', value: 'Leather' },
      { label: 'Color Base', value: 'Brown / Black' },
      { label: 'Brand', value: 'Bay Soft' },
    ],
    description:
      'Classic toe-post summer sandal with dual-tone leather straps and everyday comfort underfoot.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'ladies-open-heel---slip-on---perlita-238546020',
    name: 'Ladies Open Heel - Slip On - Perlita',
    productCode: '238546020',
    price: 2290,
    currency: 'BDT',
    category: 'Ladies Open Heel / Slip On',
    categoryPath: '/shop/women/flats',
    brand: 'Lara Clara',
    images: [
      {
        src: '/asset/products/parlita/_DSC2087.jpg',
        alt: 'Perlita — pair view',
      },
      {
        src: '/asset/products/parlita/_DSC2085.jpg',
        alt: 'Perlita — side view',
      },
      {
        src: '/asset/products/parlita/Untitled-1_sCshU1L.jpg',
        alt: 'Perlita — detail view',
      },
      {
        src: '/asset/products/parlita/_DSC2084.jpg',
        alt: 'Perlita — top view',
      },
      {
        src: '/asset/products/parlita/_DSC2086.jpg',
        alt: 'Perlita — back view',
      },
    ],
    sizes: ['35', '36', '37', '38', '39', '40'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Ladies Open Heel / Slip On' },
      { label: 'Article Type', value: 'Open Heel Slip On' },
      { label: 'Material', value: 'Leather' },
      { label: 'Color Base', value: 'Black' },
      { label: 'Brand', value: 'Lara Clara' },
    ],
    description:
      'Elegant open-heel slip-on designed for everyday polish, with a soft upper and easy wearability.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'ladies-open-heel---sandal---nora-248544801',
    name: 'Ladies Open Heel - Sandal - Nora',
    productCode: '248544801',
    price: 4490,
    currency: 'BDT',
    category: 'Ladies Open Heel / Sandal',
    categoryPath: '/shop/women/heels',
    brand: 'Lara Clara',
    images: [
      {
        src: '/asset/product-category/Hill/_DSC7878_2Zi53ga.jpg',
        alt: 'Nora sandal — side view',
      },
      {
        src: '/asset/product-category/Hill/_DSC7880_NnxAnRH.jpg',
        alt: 'Nora sandal — angle view',
      },
      {
        src: '/asset/product-category/Hill/_DSC7881_jHsR9Pm.jpg',
        alt: 'Nora sandal — detail view',
      },
      {
        src: '/asset/product-category/Hill/_DSC78821.jpg',
        alt: 'Nora sandal — alternate view',
      },
      {
        src: '/asset/product-category/Hill/_DSC7882_dvLUMGV.jpg',
        alt: 'Nora sandal — pair view',
      },
    ],
    sizes: ['35', '36', '37', '38', '39', '40'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Ladies Open Heel / Sandal' },
      { label: 'Article Type', value: 'Open Heel Sandal' },
      { label: 'Material', value: 'Metallic finish' },
      { label: 'Color Base', value: 'Rose Gold' },
      { label: 'Brand', value: 'Lara Clara' },
    ],
    description:
      'Statement open-heel sandal with crystal straps and a bold block heel — made for evening polish.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'ladies-closed---mid-heel---nora-248544802',
    name: 'Ladies Closed - Mid Heel - Nora',
    productCode: '248544802',
    price: 3490,
    currency: 'BDT',
    category: 'Ladies Closed / Mid Heel',
    categoryPath: '/shop/women/closed',
    brand: 'Lara Clara',
    images: [
      {
        src: '/asset/product-category/hill%202/_DSC9480.jpg',
        alt: 'Nora mid heel — side view',
      },
      {
        src: '/asset/product-category/hill%202/_DSC9481.jpg',
        alt: 'Nora mid heel — angle view',
      },
      {
        src: '/asset/product-category/hill%202/_DSC9482.jpg',
        alt: 'Nora mid heel — detail view',
      },
      {
        src: '/asset/product-category/hill%202/_DSC9483.jpg',
        alt: 'Nora mid heel — alternate view',
      },
      {
        src: '/asset/product-category/hill%202/_DSC9484.jpg',
        alt: 'Nora mid heel — pair view',
      },
    ],
    sizes: ['35', '36', '37', '38', '39', '40'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Ladies Closed / Mid Heel' },
      { label: 'Article Type', value: 'Slingback Mid Heel' },
      { label: 'Material', value: 'Patent finish' },
      { label: 'Color Base', value: 'Nude' },
      { label: 'Brand', value: 'Lara Clara' },
    ],
    description:
      'Pointed slingback mid heel with a clean nude finish and gold accent — everyday elegance.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'men-summer---sandal---steller-248544803',
    name: 'Men Summer - Sandal - Steller',
    productCode: '248544803',
    price: 1890,
    currency: 'BDT',
    category: 'Men Summer / Sandal',
    categoryPath: '/shop/men/sandal',
    brand: 'Bay Soft',
    images: [
      {
        src: '/asset/product-category/sandel/_DSC2337.jpg',
        alt: 'Steller sandal — pair side view',
      },
      {
        src: '/asset/product-category/sandel/_DSC2336.jpg',
        alt: 'Steller sandal — back view',
      },
      {
        src: '/asset/product-category/sandel/_DSC2338.jpg',
        alt: 'Steller sandal — detail view',
      },
      {
        src: '/asset/product-category/sandel/_DSC2339.jpg',
        alt: 'Steller sandal — alternate view',
      },
      {
        src: '/asset/product-category/sandel/_DSC2340.jpg',
        alt: 'Steller sandal — top view',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Men Summer / Sandal' },
      { label: 'Article Type', value: 'Multi-strap Slide' },
      { label: 'Material', value: 'Leather' },
      { label: 'Color Base', value: 'Brown' },
      { label: 'Brand', value: 'Bay Soft' },
    ],
    description:
      'Multi-strap summer slide with Bay metal accent — light, durable, and made for warm days.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'ladies-open-heel---slip-on---namira-248544804',
    name: 'Ladies Open Heel - Slip On - Namira',
    productCode: '248544804',
    price: 3990,
    currency: 'BDT',
    category: 'Ladies Open Heel / Slip On',
    categoryPath: '/shop/women/heels',
    brand: 'Lara Clara',
    images: [
      {
        src: '/asset/product-category/Hill%203/_DSC5597_0001_Resize_Website_0001__DSC4318.jpg',
        alt: 'Namira — side view',
      },
      {
        src: '/asset/product-category/Hill%203/_DSC5597_0000_Resize_Website_0002__DSC4319.jpg',
        alt: 'Namira — sole view',
      },
      {
        src: '/asset/product-category/Hill%203/_DSC5597_0002_Resize-Website_0005__DSC4477.jpg',
        alt: 'Namira — angle view',
      },
      {
        src: '/asset/product-category/Hill%203/_DSC5597_0003_Resize-Website_0003__DSC4320.jpg',
        alt: 'Namira — detail view',
      },
      {
        src: '/asset/product-category/Hill%203/_DSC5597_0004_Resize_Website_0004__DSC4322.jpg',
        alt: 'Namira — alternate view',
      },
    ],
    sizes: ['35', '36', '37', '38', '39', '40'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Ladies Open Heel / Slip On' },
      { label: 'Article Type', value: 'Block Heel Mule' },
      { label: 'Material', value: 'Synthetic leather' },
      { label: 'Color Base', value: 'Sage Green' },
      { label: 'Brand', value: 'Lara Clara' },
    ],
    description:
      'Sage green open-heel mule with dual straps and gold buckle detail — easy slip-on comfort.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'ladies-closed---mid-heel---camellia-248544805',
    name: 'Ladies Closed - Mid Heel - Camellia',
    productCode: '248544805',
    price: 1990,
    currency: 'BDT',
    category: 'Ladies Closed / Mid Heel',
    categoryPath: '/shop/women/closed',
    brand: 'Lara Clara',
    images: [
      {
        src: '/asset/product-category/Hill%204/_DSC9522.jpg',
        alt: 'Camellia — side view',
      },
      {
        src: '/asset/product-category/Hill%204/_DSC9523.jpg',
        alt: 'Camellia — angle view',
      },
      {
        src: '/asset/product-category/Hill%204/_DSC9524.jpg',
        alt: 'Camellia — detail view',
      },
      {
        src: '/asset/product-category/Hill%204/_DSC9525.jpg',
        alt: 'Camellia — alternate view',
      },
      {
        src: '/asset/product-category/Hill%204/_DSC9526.jpg',
        alt: 'Camellia — pair view',
      },
    ],
    sizes: ['35', '36', '37', '38', '39', '40'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Ladies Closed / Mid Heel' },
      { label: 'Article Type', value: 'Embellished Pump' },
      { label: 'Material', value: 'Embellished fabric' },
      { label: 'Color Base', value: 'Floral / Nude' },
      { label: 'Brand', value: 'Lara Clara' },
    ],
    description:
      'Embellished mid-heel pump with floral motif and pearl accents — a festive statement piece.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'men-summer---sandal---steller-248544806',
    name: 'Men Summer - Sandal - Steller',
    productCode: '248544806',
    price: 2490,
    currency: 'BDT',
    category: 'Men Summer / Sandal',
    categoryPath: '/shop/men/sandal',
    brand: 'Bay Soft',
    images: [
      {
        src: '/asset/product-category/Sandel%202/_DSC9586.jpg',
        alt: 'Steller mule — side view',
      },
      {
        src: '/asset/product-category/Sandel%202/_DSC9587.jpg',
        alt: 'Steller mule — angle view',
      },
      {
        src: '/asset/product-category/Sandel%202/_DSC9588.jpg',
        alt: 'Steller mule — detail view',
      },
      {
        src: '/asset/product-category/Sandel%202/_DSC9589.jpg',
        alt: 'Steller mule — alternate view',
      },
      {
        src: '/asset/product-category/Sandel%202/_DSC9590.jpg',
        alt: 'Steller mule — pair view',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Men Summer / Sandal' },
      { label: 'Article Type', value: 'Open-back Mule' },
      { label: 'Material', value: 'Leather' },
      { label: 'Color Base', value: 'Cognac Brown' },
      { label: 'Brand', value: 'Bay Soft' },
    ],
    description:
      'Open-back leather mule with laser-cut vents and Bay badge — casual summer ease.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'sport-kids---kids-running---genesis-258546001',
    name: 'Sport Kids - Kids Running - Genesis',
    productCode: '258546001',
    price: 2490,
    currency: 'BDT',
    category: 'Sport Kids / Kids Running',
    categoryPath: '/shop/children',
    brand: 'Striker',
    images: [
      {
        src: '/asset/children/Kids-Shoe-1.jpg',
        alt: 'Genesis kids running — pair view',
      },
    ],
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Sport Kids / Kids Running' },
      { label: 'Article Type', value: 'Kids Running' },
      { label: 'Material', value: 'Mesh / Synthetic' },
      { label: 'Color Base', value: 'Multi' },
      { label: 'Brand', value: 'Striker' },
    ],
    description:
      'Lightweight kids running shoe built for active play, with cushioned sole and easy everyday wear.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'sport-kids---kids-lifestyle---play-258546002',
    name: 'Sport Kids - Kids Lifestyle - Play',
    productCode: '258546002',
    price: 1990,
    currency: 'BDT',
    category: 'Sport Kids / Kids Lifestyle',
    categoryPath: '/shop/children',
    brand: 'Striker',
    images: [
      {
        src: '/asset/children/Kids-3.jpg',
        alt: 'Play kids lifestyle — pair view',
      },
    ],
    sizes: ['28', '29', '30', '31', '32', '33', '34'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Sport Kids / Kids Lifestyle' },
      { label: 'Article Type', value: 'Kids Lifestyle' },
      { label: 'Material', value: 'Canvas / Synthetic' },
      { label: 'Color Base', value: 'Multi' },
      { label: 'Brand', value: 'Striker' },
    ],
    description:
      'Everyday kids lifestyle sneaker with a flexible sole — made for school days and weekend play.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
  {
    slug: 'sport-mens---mens-lifestyle---pulse-258546003',
    name: 'Sport Mens - Mens Lifestyle - Pulse',
    productCode: '258546003',
    price: 3290,
    currency: 'BDT',
    category: 'Sport Mens / Mens Lifestyle',
    categoryPath: '/shop/men/casual',
    brand: 'Striker',
    images: [
      {
        src: '/asset/children/Men-Casual-2.jpg',
        alt: 'Pulse mens lifestyle — pair view',
      },
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    inStock: true,
    specs: [
      { label: 'Category', value: 'Sport Mens / Mens Lifestyle' },
      { label: 'Article Type', value: 'Mens Lifestyle' },
      { label: 'Material', value: 'Mesh / Synthetic' },
      { label: 'Color Base', value: 'Grey' },
      { label: 'Brand', value: 'Striker' },
    ],
    description:
      'Sport-inspired mens lifestyle sneaker with breathable upper and cushioned midsole for all-day comfort.',
    shippingNote:
      'Free shipping in Bangladesh. Orders inside Dhaka: 2 business days. Outside Dhaka: 3–4 business days. Cash on delivery available.',
  },
];

export function findProductBySlug(slug: string): ProductDetail | undefined {
  return PRODUCT_DETAILS.find((product) => product.slug === slug);
}
