import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  @Output() addToCart = new EventEmitter<Product>();

  constructor(private router: Router) {}

  onAddToCart(): void {
    // Emit selected product
    this.addToCart.emit(this.product);

    // Go to Cart page
    this.router.navigate(['/cart']);
  }
}