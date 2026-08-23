import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  BILLING_FORM_FIELDS,
  BILLING_FORM_HEADING,
} from '../../data/billing-fields.data';
import { CheckoutBillingForm } from './checkout-billing-form';

describe('CheckoutBillingForm', () => {
  let component: CheckoutBillingForm;
  let fixture: ComponentFixture<CheckoutBillingForm>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutBillingForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutBillingForm);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the design heading', () => {
    expect(host.textContent).toContain(BILLING_FORM_HEADING);
  });

  it('renders exactly the configured fields, in order', () => {
    const wrappers = host.querySelectorAll<HTMLElement>('form > div');

    expect(wrappers.length).toBe(BILLING_FORM_FIELDS.length);
    wrappers.forEach((wrapper, index) => {
      expect(wrapper.textContent).toContain(BILLING_FORM_FIELDS[index].label);
    });
  });

  it('marks required fields with a red asterisk and optionals as (Optional)', () => {
    const text = host.textContent ?? '';

    expect(text).toContain('(Optional)');
    expect(text).toContain('*');
    // The required-marker renders with the shared error color token.
    expect(host.querySelector('[class*="text-error"]')).toBeTruthy();
  });

  /** Control inside the n-th field wrapper (BILLING_FORM_FIELDS order). */
  function controlAt(index: number): HTMLInputElement | HTMLTextAreaElement {
    const wrapper = host.querySelectorAll<HTMLElement>('form > div')[index];
    return wrapper.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea')!;
  }

  function typeInto(control: HTMLInputElement | HTMLTextAreaElement, text: string): void {
    control.value = text;
    control.dispatchEvent(new Event('input'));
  }

  it('keeps the phone field digits-only and caps it at its maxLength', () => {
    const phone = controlAt(BILLING_FORM_FIELDS.findIndex((f) => f.id === 'phone'));

    typeInto(phone, 'abc9876543210xyz');

    expect(phone.value).toBe('9876543210');
  });

  it('strips digits and symbols from the full-name field', () => {
    const fullName = controlAt(BILLING_FORM_FIELDS.findIndex((f) => f.id === 'full-name'));

    typeInto(fullName, 'Jon1@ Doe-');

    expect(fullName.value).toBe('Jon Doe-');
  });

  it('allows letters, numbers and address punctuation in the address field', () => {
    const address = controlAt(BILLING_FORM_FIELDS.findIndex((f) => f.id === 'address'));

    typeInto(address, 'House 12/A, Road-5 (Dhaka)');

    expect(address.value).toBe('House 12/A, Road-5 (Dhaka)');
  });

  it('lets order notes take any free text', () => {
    const notes = controlAt(
      BILLING_FORM_FIELDS.findIndex((f) => f.id === 'order-notes'),
    ) as HTMLTextAreaElement;

    typeInto(notes, 'Ring the bell twice 🎁');

    expect(notes.value).toBe('Ring the bell twice 🎁');
  });

  it('exposes the numeric keypad hint and hard cap on the phone input', () => {
    const phone = controlAt(BILLING_FORM_FIELDS.findIndex((f) => f.id === 'phone'));

    expect(phone.getAttribute('inputmode')).toBe('numeric');
    expect(phone.getAttribute('maxlength')).toBe('10');
    expect(phone.getAttribute('autocomplete')).toBe('tel-national');
  });
});