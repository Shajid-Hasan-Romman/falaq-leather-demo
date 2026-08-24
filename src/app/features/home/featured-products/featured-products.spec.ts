import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { FeaturedProducts } from './featured-products';
import { CartService } from '../../../core/services/cart.service';
import { vi } from 'vitest';

describe('FeaturedProducts', () => {
  let component: FeaturedProducts;
  let fixture: ComponentFixture<FeaturedProducts>;
  let mockCartService: CartService;
  let router: Router;

  beforeEach(async () => {
    mockCartService = { addItem: vi.fn() } as unknown as CartService;

    await TestBed.configureTestingModule({
      imports: [FeaturedProducts],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProducts);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of products', () => {
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should call addToCart and navigate to cart when addToCart is called', () => {
    const product = component.products[0];
    component.addToCart(product);
    expect(mockCartService.addItem).toHaveBeenCalledWith(product);
    expect(router.navigate).toHaveBeenCalledWith(['/cart']);
  });
});
