import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { CartModule } from '../../cart.module';
import { Cart } from './cart';
import { vi } from 'vitest';

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;
  let mockCartService: CartService;

  beforeEach(() => {
    mockCartService = {
      cartItems$: of([]),
      isEmpty$: of(true),
      subtotal$: of(0),
      shipping$: of(0),
      grandTotal$: of(0),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
    } as unknown as CartService;

    TestBed.configureTestingModule({
      imports: [CartModule],
      providers: [{ provide: CartService, useValue: mockCartService }],
    });

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose observables from CartService', () => {
    expect(component.cartItems$).toBeDefined();
    expect(component.subtotal$).toBeDefined();
    expect(component.grandTotal$).toBeDefined();
    expect(component.shipping$).toBeDefined();
  });

  it('should call removeItem on service when onRemove is called', () => {
    component.onRemove('prod-1');
    expect(mockCartService.removeItem).toHaveBeenCalledWith('prod-1');
  });

  it('should call updateQuantity on service when onQuantityChange is called', () => {
    component.onQuantityChange({ id: 'prod-1', quantity: 3 });
    expect(mockCartService.updateQuantity).toHaveBeenCalledWith('prod-1', 3);
  });

  it('should call clearCart on service when onClearCart is called', () => {
    component.onClearCart();
    expect(mockCartService.clearCart).toHaveBeenCalled();
  });
});
