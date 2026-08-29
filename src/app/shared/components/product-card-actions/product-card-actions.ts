import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card-actions',
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card-actions.html',
  styleUrl: './product-card-actions.scss',
})
export class ProductCardActions {
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly slug = input.required<string>();
  readonly price = input.required<number>();
  readonly currency = input.required<string>();

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cart.addFromSlug(this.slug());
  }

  buyNow(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.cart.addFromSlug(this.slug())) {
      void this.router.navigate(['/cart']);
    }
  }
}
