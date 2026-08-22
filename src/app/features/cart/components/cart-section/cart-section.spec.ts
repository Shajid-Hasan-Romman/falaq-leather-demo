import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CartModule } from '../../cart.module';
import { CartItem } from '../../../../core/models/cart-item.model';
import { CartService } from '../../../../core/services/cart.service';
import { CartSection } from './cart-section';
import { vi } from 'vitest';

describe('CartSection', () => {
  let component: CartSection;
  let fixture: ComponentFixture<CartSection>;
  let mockCartService: CartService;
  let mockRouter: Router;

  const testItems: CartItem[] = [
    {
      id: '1',
      name: 'Product A',
      description: '1KG',
      image: '/a.png',
      price: 100,
      quantity: 2,
    },
    {
      id: '2',
      name: 'Product B',
      weight: '500g',
      image: '/b.png',
      price: 50,
      quantity: 3,
    },
  ];

  beforeEach(() => {
    mockCartService = {
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
    } as unknown as CartService;
    mockRouter = { navigate: vi.fn() } as unknown as Router;

    TestBed.configureTestingModule({
      imports: [CartModule],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(CartSection);
    component = fixture.componentInstance;
    component.items = testItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the injected items', () => {
    expect(component.items).toEqual(testItems);
  });

  it('should compute itemCount as the sum of line quantities', () => {
    expect(component.itemCount).toBe(5);
  });

  it('should compute lineTotal as price × quantity', () => {
    expect(component.lineTotal(testItems[0]!)).toBe(200);
    expect(component.lineTotal(testItems[1]!)).toBe(150);
  });

  it('should forward quantity changes to updateQuantity', () => {
    component.onQuantityChange(testItems[0]!, 3);
    expect(mockCartService.updateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('should forward item removal to removeItem', () => {
    component.onRemoveItem('2');
    expect(mockCartService.removeItem).toHaveBeenCalledWith('2');
  });

  it('should navigate to products when continueShopping is called', () => {
    component.continueShopping();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });
});