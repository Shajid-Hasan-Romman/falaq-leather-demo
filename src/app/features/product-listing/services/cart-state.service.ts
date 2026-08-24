import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartStateService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  private readonly countSubject = new BehaviorSubject<number>(0);
  readonly count$: Observable<number> = this.countSubject.asObservable();

  addToCart(product: Product): void {
    const current = this.itemsSubject.value;
    const existing = current.find(i => i.product.id === product.id);

    let updated: CartItem[];
    if (existing) {
      updated = current.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updated = [...current, { product, quantity: 1 }];
    }

    this.itemsSubject.next(updated);
    this.countSubject.next(updated.reduce((sum, i) => sum + i.quantity, 0));
  }

  removeFromCart(productId: number): void {
    const updated = this.itemsSubject.value.filter(i => i.product.id !== productId);
    this.itemsSubject.next(updated);
    this.countSubject.next(updated.reduce((sum, i) => sum + i.quantity, 0));
  }

  clearCart(): void {
    this.itemsSubject.next([]);
    this.countSubject.next(0);
  }
}