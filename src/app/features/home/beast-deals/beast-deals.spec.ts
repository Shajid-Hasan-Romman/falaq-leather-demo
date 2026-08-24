import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { BeastDeals } from './beast-deals';
import { CartService } from '../../../core/services/cart.service';
import { vi } from 'vitest';

describe('BeastDeals', () => {
  let component: BeastDeals;
  let fixture: ComponentFixture<BeastDeals>;
  let mockCartService: CartService;
  let router: Router;

  beforeEach(async () => {
    mockCartService = { addItem: vi.fn() } as unknown as CartService;

    await TestBed.configureTestingModule({
      imports: [BeastDeals],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BeastDeals);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of deals', () => {
    expect(component.deals.length).toBeGreaterThan(0);
  });

  it('should call addItem and navigate to cart when addToCart is called', () => {
    const deal = component.deals[0];
    component.addToCart(deal);
    expect(mockCartService.addItem).toHaveBeenCalledWith(deal);
    expect(router.navigate).toHaveBeenCalledWith(['/cart']);
  });
});
