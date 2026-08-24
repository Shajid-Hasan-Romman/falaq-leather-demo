import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CartModule } from '../../cart.module';
import { CartItemRow } from './cart-item';
import { CartItem } from '../../../../core/models/cart-item.model';
import { CartService } from '../../../../core/services/cart.service';
import { vi } from 'vitest';

describe('CartItemRow', () => {
  let component: CartItemRow;
  let fixture: ComponentFixture<CartItemRow>;
  let mockCartService: CartService;

  const testItem: CartItem = {
    id: '1',
    name: 'Test Product',
    image: '/test.jpg',
    price: 100,
    weight: '500g',
    quantity: 2,
  };

  beforeEach(() => {
    mockCartService = {
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
    } as unknown as CartService;

    TestBed.configureTestingModule({
      imports: [CartModule],
      providers: [{ provide: CartService, useValue: mockCartService }],
    });

    fixture = TestBed.createComponent(CartItemRow);
    component = fixture.componentInstance;
    component.item = testItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    const nameEl = fixture.debugElement.query(By.css('h3'));
    expect(nameEl.nativeElement.textContent).toContain('Test Product');
  });

  it('should calculate itemTotal as price × quantity', () => {
    expect(component.itemTotal).toBe(200);
  });

  it('should call updateQuantity with +1 when increase() is called', () => {
    component.increase();
    expect(mockCartService.updateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('should call updateQuantity with -1 when decrease() is called', () => {
    component.decrease();
    expect(mockCartService.updateQuantity).toHaveBeenCalledWith('1', 1);
  });

  it('should call removeItem when remove() is called', () => {
    component.remove();
    expect(mockCartService.removeItem).toHaveBeenCalledWith('1');
  });
});
