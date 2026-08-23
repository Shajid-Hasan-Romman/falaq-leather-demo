import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ORDER_SUMMARY } from '../../data/order-summary.data';
import { CheckoutOrderSummary } from './checkout-order-summary';

describe('CheckoutOrderSummary', () => {
  let component: CheckoutOrderSummary;
  let fixture: ComponentFixture<CheckoutOrderSummary>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutOrderSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutOrderSummary);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the summary card with its heading and configured line items', () => {
    const text = host.textContent ?? '';

    expect(text).toContain(ORDER_SUMMARY.title);
    ORDER_SUMMARY.lineItems.forEach((item) => {
      expect(text).toContain(item.name);
      expect(text).toContain(item.weight);
      expect(text).toContain(item.quantity);
      expect(text).toContain(item.price);
    });
  });

  it('renders the totals, privacy note and place-order action', () => {
    const text = host.textContent ?? '';

    expect(text).toContain(ORDER_SUMMARY.subtotalLabel);
    expect(text).toContain(ORDER_SUMMARY.subtotal);
    expect(text).toContain(ORDER_SUMMARY.shippingLabel);
    expect(text).toContain(ORDER_SUMMARY.shipping);
    expect(text).toContain(ORDER_SUMMARY.totalLabel);
    expect(text).toContain(ORDER_SUMMARY.total);
    expect(text).toContain(ORDER_SUMMARY.privacyNote);
    expect(text).toContain(ORDER_SUMMARY.privacyPolicyLabel);
    expect(text).toContain(ORDER_SUMMARY.placeOrderLabel);
  });

  it('is config driven: renders one row per line item', () => {
    const rows = host.querySelectorAll<HTMLElement>('h4');

    expect(rows.length).toBe(ORDER_SUMMARY.lineItems.length);
  });
});