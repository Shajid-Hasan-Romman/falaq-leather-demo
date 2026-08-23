import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../product-listing/models/product.model';
import { PRODUCT_DEMO_DATA } from '../../../product-listing/data/product-demo.data';
import { CartStateService } from '../../../product-listing/services/cart-state.service';

@Component({
  selector: 'app-product-details',
    standalone: false,

  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails implements OnInit {
  product: Product = PRODUCT_DEMO_DATA[0];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cartStateService: CartStateService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.queryParamMap.get('id'));
    const selectedProduct = PRODUCT_DEMO_DATA.find(item => item.id === productId);

    if (selectedProduct) {
      this.product = selectedProduct;
    }
  }

  addToCart(): void {
    this.cartStateService.addToCart(this.product);
  }
}