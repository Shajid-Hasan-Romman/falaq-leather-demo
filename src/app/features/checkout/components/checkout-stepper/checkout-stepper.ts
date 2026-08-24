import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import {
  CHECKOUT_STEPS,
  type CheckoutStep,
  type CheckoutStepStatus,
} from '../../data/checkout-steps.data';

const LABEL_BASE = 'text-center text-[13px] leading-tight md:text-[14px]';

const LABEL_CLASS: Record<CheckoutStepStatus, string> = {
  completed: `${LABEL_BASE} font-medium text-ink`,
  active: `${LABEL_BASE} font-medium text-ink`,
  upcoming: `${LABEL_BASE} font-medium text-ink-muted`,
};

const CONNECTOR_BASE = 'h-[2px] w-full rounded-full';

const CONNECTOR_CLASS: Record<'completed' | 'upcoming', string> = {
  completed: `${CONNECTOR_BASE} bg-brand`,
  upcoming: `${CONNECTOR_BASE} bg-line`,
};

interface CheckoutStepFrame {
  readonly step: CheckoutStep;
  readonly isLast: boolean;
  readonly connectorStatus: 'completed' | 'upcoming';
}

@Component({
  selector: 'app-checkout-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-stepper.html',
  styleUrl: './checkout-stepper.scss',
})
export class CheckoutStepper {
  readonly steps = input<readonly CheckoutStep[]>(CHECKOUT_STEPS);

  protected readonly labelClass = LABEL_CLASS;
  protected readonly connectorClass = CONNECTOR_CLASS;

  protected readonly frames = computed<readonly CheckoutStepFrame[]>(() => {
    const steps = this.steps();
    return steps.map((step, index) => ({
      step,
      isLast: index === steps.length - 1,
      connectorStatus: step.status === 'completed' ? 'completed' : 'upcoming',
    }));
  });
}