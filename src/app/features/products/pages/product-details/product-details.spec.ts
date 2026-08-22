import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { CartService } from '../../../../core/services/cart.service';
import { ProductModule } from '../../product.module';
import { ProductDetails } from './product-details';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;
  let mockCartService: CartService;

  beforeEach(() => {
    mockCartService = { addItem: vi.fn() } as unknown as CartService;

    TestBed.configureTestingModule({
      imports: [ProductModule],
      providers: [{ provide: CartService, useValue: mockCartService }],
    });

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the displayed product to the cart', () => {
    component.addToCart();
    expect(mockCartService.addItem).toHaveBeenCalledWith(component.product);
  });
});