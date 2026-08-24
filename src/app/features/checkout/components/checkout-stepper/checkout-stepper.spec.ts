import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHECKOUT_STEPS } from '../../data/checkout-steps.data';
import { CheckoutStepper } from './checkout-stepper';

describe('CheckoutStepper', () => {
  let component: CheckoutStepper;
  let fixture: ComponentFixture<CheckoutStepper>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutStepper);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders exactly the steps from the JSON config, in order', () => {
    const steps = host.querySelectorAll<HTMLElement>('.checkout-stepper__step');

    expect(steps.length).toBe(CHECKOUT_STEPS.length);
    steps.forEach((step, index) => {
      const label = step.querySelector<HTMLElement>('.checkout-stepper__label');
      expect(label?.textContent?.trim()).toBe(CHECKOUT_STEPS[index].label);
    });
  });

  it('renders the completed step with a check icon', () => {
    const firstStep = host.querySelector<HTMLElement>('.checkout-stepper__step');
    const indicator = firstStep?.querySelector<HTMLElement>('.checkout-stepper__indicator');

    expect(firstStep).toBeTruthy();
    expect(indicator?.querySelector('.fa-check')).toBeTruthy();
  });

  it('renders the active step with aria-current="step"', () => {
    const activeStep = host.querySelectorAll<HTMLElement>('.checkout-stepper__step')[1];

    expect(activeStep?.getAttribute('aria-current')).toBe('step');
    expect(activeStep?.querySelector('.checkout-stepper__indicator span')).toBeTruthy();
  });

  it('renders one connector between every pair of steps (never after the last)', () => {
    const connectors = host.querySelectorAll<HTMLElement>('.checkout-stepper__connector');

    expect(connectors.length).toBe(Math.max(0, CHECKOUT_STEPS.length - 1));
  });
});