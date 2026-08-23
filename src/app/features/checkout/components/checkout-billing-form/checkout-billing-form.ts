import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

import { IcBillingComponent } from '../../../../shared/components/icons/ic-billing.component';
import { IcCountryBdComponent } from '../../../../shared/components/icons/ic-country-bd.component';
import { IcLocationComponent } from '../../../../shared/components/icons/ic-location.component';
import { IcNoteComponent } from '../../../../shared/components/icons/ic-note.component';
import { IcUserComponent } from '../../../../shared/components/icons/ic-user.component';
import {
  BILLING_FORM_FIELDS,
  BILLING_FORM_HEADING,
  type BillingFieldMask,
  type BillingFieldType,
  type BillingFormField,
} from '../../data/billing-fields.data';

/** Per-field UI state driving the floating-label animation. */
interface BillingFieldUiState {
  readonly focused: boolean;
  readonly value: string;
}

/** Render model so the template stays pure presentation. */
interface BillingFieldFrame {
  readonly field: BillingFormField;
  /** Wrapper classes — `relative` anchors the absolute label + grid span. */
  readonly wrapClass: string;
  /** True once the label has floated up onto the outline notch. */
  readonly floated: boolean;
  /** Full class list for the label (position/size depend on float state). */
  readonly labelClass: string;
}

/**
 * Outlined / floating-label anatomy. Every state shares a white pill so the
 * label reads as a notch cut into the border; only position + size change.
 */
const LABEL_BASE =
  'pointer-events-none absolute whitespace-nowrap bg-surface px-1 text-ink-muted transition-all duration-200 ease-out';

/** Where the label rests while the field is empty and untouched. */
const RESTING_STATE: Record<BillingFieldType, string> = {
  text: 'left-10 top-1/2 -translate-y-1/2 text-base leading-6',
  // The country block permanently occupies the resting spot, so the tel
  // label stays docked on the outline (matches the design).
  tel: '-top-2.5 left-3 text-xs leading-none',
  textarea: 'left-11 top-[17px] text-sm leading-[22px]',
  select: '-top-2.5 left-3 text-xs leading-none',
  time: '-top-2.5 left-3 text-xs leading-none',
};

/** Floated state — label docks onto the top border notch, smaller. */
const FLOATED_STATE = '-top-2.5 left-3 text-xs leading-none';

/**
 * Live keystroke filters, one per `BillingFieldMask` (config comes from
 * `billing-fields.data.ts`). Pure functions so OnPush change detection stays
 * predictable and every mask is trivially unit-testable.
 */
const FIELD_MASKS: Record<BillingFieldMask, (raw: string) => string> = {
  // Letters + combining marks (Unicode categories L/M — covers Bangla), then
  // spaces and `' . -` for names like "Md. Rahim-Uddin".
  name: (raw) => raw.replace(/[^\p{L}\p{M} '.-]/gu, ''),
  // Digits only — the +880 dial code sits outside the phone input.
  digits: (raw) => raw.replace(/\D/g, ''),
  // Postal strings: letters, numbers and common separators/punctuation.
  address: (raw) => raw.replace(/[^\p{L}\p{M}\p{N} ',./#()-]/gu, ''),
  // Order notes accept unrestricted prose (just normalise CRLF newlines).
  'free-text': (raw) => raw.replace(/\r\n/g, '\n'),
};

@Component({
  selector: 'app-checkout-billing-form',
  imports: [
    IcBillingComponent,
    IcCountryBdComponent,
    IcUserComponent,
    IcLocationComponent,
    IcNoteComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-billing-form.html',
  styleUrl: './checkout-billing-form.scss',
})
export class CheckoutBillingForm {
  readonly invalidFieldIds = input<readonly string[]>([]);
  readonly valuesChange = output<Readonly<Record<string, string>>>();
  /** Field config; defaults to the design data file. */
  readonly fields = signal<readonly BillingFormField[]>(BILLING_FORM_FIELDS);

  protected readonly heading = BILLING_FORM_HEADING;

  /** Focus/value state per field id — drives the floating-label animation. */
  private readonly fieldStates = signal<Readonly<Record<string, BillingFieldUiState>>>(
    BILLING_FORM_FIELDS.reduce<Record<string, BillingFieldUiState>>((acc, field) => {
      acc[field.id] = { focused: false, value: '' };
      return acc;
    }, {}),
  );

  protected readonly frames = computed<readonly BillingFieldFrame[]>(() => {
    const states = this.fieldStates();
    return this.fields().map((field) => {
      const state = states[field.id] ?? { focused: false, value: '' };
      // The tel label stays docked on the outline: its country block
      // permanently occupies the resting spot inside the field.
      const floated =
        field.type === 'tel' || state.focused || state.value.trim().length > 0;
      return {
        field,
        wrapClass: `relative flex flex-col${field.fullColumn ?? false ? ' md:col-span-2' : ''}`,
        floated,
        labelClass: [
          LABEL_BASE,
          floated ? FLOATED_STATE : `${RESTING_STATE[field.type]} text-ink-muted`,
        ].join(' '),
      };
    });
  });

  protected onFieldFocus(fieldId: string): void {
    this.patchState(fieldId, { focused: true });
  }

  protected isInvalid(fieldId: string): boolean {
    return this.invalidFieldIds().includes(fieldId);
  }

  protected onFieldBlur(fieldId: string): void {
    this.patchState(fieldId, { focused: false });
  }

  protected onFieldInput(fieldId: string, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    // Never fight an IME mid-composition (Bangla keyboards merge keystrokes
    // into clusters); the mask is applied on `compositionend` instead.
    if ((event as InputEvent).isComposing === true) {
      this.patchState(fieldId, { value: target.value });
      return;
    }

    this.applyMaskedValue(fieldId, target);
  }

  protected onFieldCompositionEnd(fieldId: string, event: CompositionEvent): void {
    this.applyMaskedValue(fieldId, event.target as HTMLInputElement | HTMLTextAreaElement);
  }

  /** Runs the field's mask, mirrors it back into the control and stores it. */
  private applyMaskedValue(
    fieldId: string,
    control: HTMLInputElement | HTMLTextAreaElement,
  ): void {
    const value = this.maskValue(fieldId, control.value);
    // Write-back makes illegal characters vanish instantly (the caret jumps
    // to the end — an accepted tradeoff for these lightweight masks).
    control.value = value;
    this.patchState(fieldId, { value });
  }

  private maskValue(fieldId: string, raw: string): string {
    const field = this.fields().find((candidate) => candidate.id === fieldId);

    if (!field) {
      return raw;
    }

    const masked = FIELD_MASKS[field.mask](raw);

    return typeof field.maxLength === 'number' && field.maxLength > 0
      ? masked.slice(0, field.maxLength)
      : masked;
  }

  private patchState(fieldId: string, changes: Partial<BillingFieldUiState>): void {
    this.fieldStates.update((states) => {
      const nextStates = {
      ...states,
      [fieldId]: { ...states[fieldId], ...changes },
      };
      this.valuesChange.emit(
        Object.fromEntries(
          Object.entries(nextStates).map(([id, state]) => [id, state.value]),
        ),
      );
      return nextStates;
    });
  }
}