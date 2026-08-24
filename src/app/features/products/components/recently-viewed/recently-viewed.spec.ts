import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductModule } from '../../product.module';
import { RecentlyViewed } from './recently-viewed';
import { CartService } from '../../../../core/services/cart.service';
import { vi } from 'vitest';

describe('RecentlyViewed', () => {
  let component: RecentlyViewed;
  let fixture: ComponentFixture<RecentlyViewed>;
  let mockCartService: CartService;

  beforeEach(() => {
    mockCartService = { addItem: vi.fn() } as unknown as CartService;

    TestBed.configureTestingModule({
      imports: [ProductModule],
      providers: [{ provide: CartService, useValue: mockCartService }],
    });

    fixture = TestBed.createComponent(RecentlyViewed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of products', () => {
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should call addToCart when addToCart is called', () => {
    const product = component.products[0];
    component.addToCart(product);
    expect(mockCartService.addItem).toHaveBeenCalledWith(product);
  });
});
