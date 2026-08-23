import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartModule } from '../../cart.module';
import { OrderSummary } from './order-summary';
import { CartService } from '../../../../core/services/cart.service';
import { SHIPPING_OPTIONS } from '../../../../core/constants/delivery-options';
import { vi } from 'vitest';

describe('OrderSummary', () => {
  let component: OrderSummary;
  let fixture: ComponentFixture<OrderSummary>;
  let mockCartService: CartService;

  beforeEach(() => {
    mockCartService = {
      cartItems$: of([]),
      subtotal$: of(500),
      shipping$: of(60),
      grandTotal$: of(560),
      isEmpty$: of(false),
      shippingOptions$: of(SHIPPING_OPTIONS),
      selectedShipping$: of(SHIPPING_OPTIONS[0]),
      setShipping: vi.fn(),
      clearCart: vi.fn(),
    } as unknown as CartService;

    TestBed.configureTestingModule({
      imports: [CartModule],
      providers: [{ provide: CartService, useValue: mockCartService }],
    });

    fixture = TestBed.createComponent(OrderSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose subtotal$, shipping$, grandTotal$, isEmpty$ observables', () => {
    expect(component.subtotal$).toBeDefined();
    expect(component.shipping$).toBeDefined();
    expect(component.grandTotal$).toBeDefined();
    expect(component.isEmpty$).toBeDefined();
  });

  it('should expose the shipping options and the currently selected one', () => {
    expect(component.shippingOptions$).toBeDefined();
    expect(component.selectedShipping$).toBeDefined();
  });

  it('should forward the selected shipping zone to CartService', () => {
    component.selectShipping('outside-dhaka');
    expect(mockCartService.setShipping).toHaveBeenCalledWith('outside-dhaka');
  });

  it('should toggle the dropdown open/closed with toggleShipping', () => {
    expect(component.isOpen).toBe(false);
    component.toggleShipping();
    expect(component.isOpen).toBe(true);
    component.toggleShipping();
    expect(component.isOpen).toBe(false);
  });

  it('should close the dropdown after selecting a shipping zone', () => {
    component.toggleShipping();
    expect(component.isOpen).toBe(true);

    component.selectShipping('sub-dhaka');
    expect(mockCartService.setShipping).toHaveBeenCalledWith('sub-dhaka');
    expect(component.isOpen).toBe(false);
  });

  it('should call clearCart with confirmation when clearCartWithConfirm is called and confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.clearCartWithConfirm();
    expect(mockCartService.clearCart).toHaveBeenCalled();
  });

  it('should NOT call clearCart when confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    component.clearCartWithConfirm();
    expect(mockCartService.clearCart).not.toHaveBeenCalled();
  });
});
