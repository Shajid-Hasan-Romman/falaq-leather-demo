import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DELIVERY_AREAS } from '../../data/delivery-areas.data';
import { CheckoutDeliveryArea } from './checkout-delivery-area';

describe('CheckoutDeliveryArea', () => {
  let component: CheckoutDeliveryArea;
  let fixture: ComponentFixture<CheckoutDeliveryArea>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutDeliveryArea],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutDeliveryArea);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the design heading', () => {
    expect(host.textContent).toContain('Select your delivery area');
  });

  it('renders exactly the areas from the config, in order', () => {
    const tiles = host.querySelectorAll<HTMLButtonElement>('button[role="radio"]');

    expect(tiles.length).toBe(DELIVERY_AREAS.length);
    tiles.forEach((tile, index) => {
      expect(tile.textContent).toContain(DELIVERY_AREAS[index].name);
      expect(tile.textContent).toContain(DELIVERY_AREAS[index].price);
    });
  });

  it('defaults to the configured area as selected (check badge)', () => {
    const tiles = host.querySelectorAll<HTMLButtonElement>('button[role="radio"]');

    expect(tiles[0].getAttribute('aria-checked')).toBe('true');
    expect(tiles[0].querySelector('.fa-check')).toBeTruthy();
  });

  it('moves the selection state when another area is clicked', () => {
    const tiles = host.querySelectorAll<HTMLButtonElement>('button[role="radio"]');

    tiles[1].click();
    fixture.detectChanges();

    expect(tiles[1].getAttribute('aria-checked')).toBe('true');
    expect(tiles[1].querySelector('.fa-check')).toBeTruthy();
    expect(tiles[0].getAttribute('aria-checked')).toBe('false');
  });

  it('paints the selected fill + brand border on whichever box is chosen', () => {
    const tiles = host.querySelectorAll<HTMLButtonElement>('button[role="radio"]');

    // Design default: Inside Dhaka starts selected.
    expect(tiles[0].className).toContain('bg-selected');
    expect(tiles[0].className).toContain('border-brand');

    // Moving the selection re-points both classes to the clicked box only.
    tiles[2].click(); // Outside Dhaka
    fixture.detectChanges();

    expect(tiles[2].className).toContain('bg-selected');
    expect(tiles[2].className).toContain('border-brand');
    // Exactly one background wins: the selected box must not still carry the
    // idle surface fill (stylesheet order would override the selection tint).
    expect(tiles[2].className).not.toContain('bg-surface');
    expect(tiles[0].className).not.toContain('bg-selected');
    expect(tiles[1].className).not.toContain('bg-selected');
  });
});