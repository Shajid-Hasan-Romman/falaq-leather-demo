import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
import type { CheckoutDetails } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, DecimalPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private readonly cart = inject(CartService);

  readonly items = this.cart.items;
  readonly itemCount = this.cart.itemCount;
  readonly subtotal = this.cart.subtotal;
  readonly currency = this.cart.currency;
  readonly isEmpty = this.cart.isEmpty;
  readonly qualifiesFreeDelivery = this.cart.qualifiesFreeDelivery;
  readonly lastOrder = this.cart.lastOrder;

  readonly fullName = signal('');
  readonly phone = signal('');
  readonly address = signal('');
  readonly city = signal('');
  readonly note = signal('');
  readonly formError = signal<string | null>(null);
  readonly showCheckout = signal(false);

  readonly deliveryLabel = computed(() =>
    this.qualifiesFreeDelivery() ? 'Free' : 'Standard (COD)',
  );

  readonly freeDeliveryRemaining = computed(() =>
    Math.max(0, 5000 - this.subtotal()),
  );

  readonly freeDeliveryProgress = computed(() =>
    Math.min(100, Math.round((this.subtotal() / 5000) * 100)),
  );

  increaseQty(id: string): void {
    this.cart.increaseQuantity(id);
  }

  decreaseQty(id: string): void {
    this.cart.decreaseQuantity(id);
  }

  removeItem(id: string): void {
    this.cart.removeItem(id);
  }

  openCheckout(): void {
    if (this.isEmpty()) {
      return;
    }
    this.showCheckout.set(true);
    this.formError.set(null);
  }

  cancelCheckout(): void {
    this.showCheckout.set(false);
    this.formError.set(null);
  }

  placeOrder(event: Event): void {
    event.preventDefault();

    if (this.isEmpty()) {
      this.formError.set('Your cart is empty.');
      return;
    }

    const customer: CheckoutDetails = {
      fullName: this.fullName().trim(),
      phone: this.phone().trim().replace(/[\s-]/g, ''),
      address: this.address().trim(),
      city: this.city().trim(),
      note: this.note().trim(),
    };

    if (
      !customer.fullName ||
      !customer.phone ||
      !customer.address ||
      !customer.city
    ) {
      this.formError.set('Please fill in name, phone, address, and city.');
      return;
    }

    const digits = customer.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      this.formError.set('Enter a valid phone number.');
      return;
    }

    const order = this.cart.placeOrder({
      ...customer,
      phone: digits,
    });

    if (!order) {
      this.formError.set('Could not place order. Try again.');
      return;
    }

    this.formError.set(null);
    this.showCheckout.set(false);
    this.fullName.set('');
    this.phone.set('');
    this.address.set('');
    this.city.set('');
    this.note.set('');
  }

  continueShopping(): void {
    this.cart.clearLastOrder();
  }

  formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleString('en-BD', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return iso;
    }
  }
}
