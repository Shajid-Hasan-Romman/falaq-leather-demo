import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { CartModule } from '../../cart.module';
import { CartService } from '../../../../core/services/cart.service';
import { PopularProducts } from './popular-products';

describe('PopularProducts', () => {
  let component: PopularProducts;
  let fixture: ComponentFixture<PopularProducts>;
  let mockCartService: CartService;

  beforeEach(async () => {
    mockCartService = { addItem: vi.fn() } as unknown as CartService;

    await TestBed.configureTestingModule({
      imports: [CartModule],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 2 popular products', () => {
    expect(component.products).toHaveLength(2);
    expect(component.products[0]?.id).toBe('pp-1');
    expect(component.products[1]?.id).toBe('pp-2');
  });

  it('should default each product to its first size', () => {
    expect(component.selectedSizes['pp-1']).toBe('1 kg');
    expect(component.selectedSizes['pp-2']).toBe('1 kg');
  });

  it('should select a size for a product', () => {
    component.selectSize('pp-1', '2 kg');
    expect(component.selectedSizes['pp-1']).toBe('2 kg');
  });

  it('should compute the save amount as old price minus sale price', () => {
    const product = component.products[0]!;
    expect(component.saveAmount(product)).toBe(200);
  });

  it('should rotate products forward with next()', () => {
    expect(component.products[0]!.id).toBe('pp-1');
    component.next();
    expect(component.products[0]!.id).toBe('pp-2');
    component.next();
    expect(component.products[0]!.id).toBe('pp-1');
  });

  it('should rotate products backward with previous()', () => {
    expect(component.products[1]!.id).toBe('pp-2');
    component.previous();
    expect(component.products[1]!.id).toBe('pp-1');
    component.previous();
    expect(component.products[1]!.id).toBe('pp-2');
  });

  it('should add a product to the cart via CartService', () => {
    const product = component.products[0]!;
    component.addToCart(product);
    expect(mockCartService.addItem).toHaveBeenCalledWith(product);
  });
});
