import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';

import { CartStateService } from '../../../product-listing/services/cart-state.service';
import { ProductModule } from '../../product.module';
import { ProductDetails } from './product-details';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;
  let mockCartStateService: CartStateService;

  beforeEach(() => {
    mockCartStateService = { addToCart: vi.fn() } as unknown as CartStateService;

    TestBed.configureTestingModule({
      imports: [ProductModule],
      providers: [
        { provide: CartStateService, useValue: mockCartStateService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: { get: () => null } } },
        },
      ],
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
    expect(mockCartStateService.addToCart).toHaveBeenCalledWith(component.product);
  });
});
