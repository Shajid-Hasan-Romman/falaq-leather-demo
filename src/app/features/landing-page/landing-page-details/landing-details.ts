import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LucideCheck,
  LucideHeart,
  LucideMapPin,
  LucideMessageCircle,
  LucidePhone,
  LucideShoppingBag,
  LucideSparkles,
  LucideTruck,
  LucideUser,
} from '@lucide/angular';

import { PRODUCT_DETAILS } from '../../../core/data/products.data';
import {
  DELIVERY_ZONES,
  FREE_DELIVERY_THRESHOLD,
  deliveryZoneFee,
  type CartItem,
  type DeliveryZoneId,
} from '../../../core/models/cart.model';
import { CartService } from '../../../core/services/cart.service';

interface LandingUpsell {
  readonly slug: string;
  readonly name: string;
  readonly price: number;
  readonly compareAt: number;
  readonly currency: string;
  readonly image: string;
  readonly sizeLabel: string;
}

function demoCartProduct(): CartItem {
  const product = PRODUCT_DETAILS[0];
  return {
    id: `${product.slug}__${product.sizes[0] ?? '40'}`,
    slug: product.slug,
    name: product.name,
    size: product.sizes[0] ?? '40',
    price: product.price,
    currency: product.currency,
    image: product.images[0]?.src ?? '',
    quantity: 1,
  };
}

function compareAtPrice(price: number): number {
  return Math.round(price * 1.35);
}

@Component({
  selector: 'app-landing-details',
  imports: [
    RouterLink,
    DecimalPipe,
    FormsModule,
    LucideSparkles,
    LucideShoppingBag,
    LucideTruck,
    LucideHeart,
    LucidePhone,
    LucideMessageCircle,
    LucideUser,
    LucideMapPin,
    LucideCheck,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing-details.html',
  styleUrl: './landing-details.scss',
})
export class LandingDetails {
  private readonly cart = inject(CartService);

  readonly deliveryZones = DELIVERY_ZONES;
  readonly freeDeliveryThreshold = FREE_DELIVERY_THRESHOLD;

  readonly quantity = signal(1);
  readonly deliveryZone = signal<DeliveryZoneId>('inside-dhaka');
  readonly selectedUpsellSlug = signal<string | null>(null);

  readonly fullName = signal('');
  readonly phone = signal('');
  readonly address = signal('');
  readonly note = signal('');
  readonly formError = signal<string | null>(null);
  readonly orderPlaced = signal(false);

  readonly item = computed<CartItem>(() => {
    const fromCart = this.cart.items()[0];
    return fromCart ?? demoCartProduct();
  });

  readonly fromCart = computed(() => this.cart.items().length > 0);

  readonly salePrice = computed(() => this.item().price);

  readonly compareAt = computed(() => compareAtPrice(this.salePrice()));

  readonly savings = computed(() => this.compareAt() - this.salePrice());

  readonly upsells = computed<readonly LandingUpsell[]>(() => {
    const current = this.item().slug;
    return PRODUCT_DETAILS.filter((p) => p.slug !== current)
      .slice(0, 2)
      .map((p) => ({
        slug: p.slug,
        name: p.name,
        price: p.price,
        compareAt: compareAtPrice(p.price),
        currency: p.currency,
        image: p.images[0]?.src ?? '',
        sizeLabel: p.sizes[0] ? `Size ${p.sizes[0]}` : 'One size',
      }));
  });

  readonly selectedUpsell = computed(() => {
    const slug = this.selectedUpsellSlug();
    if (!slug) {
      return null;
    }
    return this.upsells().find((u) => u.slug === slug) ?? null;
  });

  readonly subtotal = computed(() => {
    const main = this.salePrice() * this.quantity();
    const upsell = this.selectedUpsell();
    return main + (upsell?.price ?? 0);
  });

  /** Same rule as cart: free delivery when subtotal >= threshold. */
  readonly qualifiesFreeDelivery = computed(
    () => this.subtotal() >= FREE_DELIVERY_THRESHOLD,
  );

  readonly freeDeliveryRemaining = computed(() =>
    Math.max(0, FREE_DELIVERY_THRESHOLD - this.subtotal()),
  );

  readonly freeDeliveryProgress = computed(() =>
    Math.min(
      100,
      Math.round((this.subtotal() / FREE_DELIVERY_THRESHOLD) * 100),
    ),
  );

  readonly zoneFee = computed(() => deliveryZoneFee(this.deliveryZone()));

  readonly deliveryFee = computed(() =>
    this.qualifiesFreeDelivery() ? 0 : this.zoneFee(),
  );

  readonly total = computed(() => this.subtotal() + this.deliveryFee());

  decreaseQty(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  increaseQty(): void {
    this.quantity.update((q) => Math.min(20, q + 1));
  }

  selectZone(zone: DeliveryZoneId): void {
    if (this.qualifiesFreeDelivery()) {
      return;
    }
    this.deliveryZone.set(zone);
  }

  toggleUpsell(slug: string): void {
    this.selectedUpsellSlug.update((current) =>
      current === slug ? null : slug,
    );
  }

  submitOrder(): void {
    this.formError.set(null);
    this.orderPlaced.set(false);

    const name = this.fullName().trim();
    const phone = this.phone().trim();
    const address = this.address().trim();

    if (!name || !phone || !address) {
      this.formError.set('Please fill in name, phone, and address.');
      return;
    }

    if (!/^01\d{9}$/.test(phone) && !/^\+8801\d{9}$/.test(phone)) {
      this.formError.set('Enter a valid Bangladeshi phone number.');
      return;
    }

    // Frontend mock confirm — API later.
    this.orderPlaced.set(true);
  }
}
