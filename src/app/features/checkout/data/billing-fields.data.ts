/**
 * Billing Information form fields — config-driven single source of truth for
 * the "Billing Information" checkout card. Fields, labels, required markers,
 * placeholders and layout (full column vs. half column) are all defined here.
 */

export type BillingFieldType = 'text' | 'tel' | 'textarea' | 'select' | 'time';

/** Which shared SVG icon primitive renders inside the field, if any. */
export type BillingSvgIcon = 'user' | 'location' | 'note';

/**
 * Live keystroke filter applied while the user types:
 *
 * - `name`      → letters only (Unicode-safe: English *and* Bangla), plus
 *                 spaces and `' . -` so names like "Md. Rahim-Uddin" work.
 * - `digits`    → digits only — used by the phone number (the +880 dial code
 *                 lives outside the input, so no `+` inside it).
 * - `address`   → letters + numbers + human postal punctuation
 *                 (`' , . / # ( ) -`) — "House 12/A, Road-5" style strings.
 * - `free-text` → anything goes — order notes stay unrestricted prose.
 */
export type BillingFieldMask = 'name' | 'digits' | 'address' | 'free-text';

export interface BillingFormField {
  /** Stable unique id, also used as the @for track key. */
  id: string;
  /** Floating label text above the field. */
  label: string;
  /** Whether the field is required (renders the red asterisk). */
  required: boolean;
  /** Optional fields render "(Optional)" in their label. */
  optional?: boolean;
  type: BillingFieldType;
  /** Keystroke filter applied live while typing (see `BillingFieldMask`). */
  mask: BillingFieldMask;
  placeholder: string;
  /** Options rendered when the field type is `select`. */
  options?: readonly { label: string; value: string }[];
  /** Hard character cap rendered as `maxlength` and enforced while typing. */
  maxLength?: number;
  /** Virtual-keyboard hint for touch devices (`numeric`, `tel`, …). */
  inputMode?: 'text' | 'numeric' | 'tel' | 'decimal';
  /** Browser autofill hint (`name`, `tel-national`, `street-address`, …). */
  autoComplete?: string;
  /**
   * Font Awesome icon class shown inside the field on the left. Ignored when
   * `svgIcon` is set (the shared SVG icon wins).
   */
  iconClass: string;
  /** Optional shared SVG icon rendered inside the field on the left. */
  svgIcon?: BillingSvgIcon;
  /** Span both grid columns (Address, Order Notes). */
  fullColumn?: boolean;
  /** Dialing code shown before the phone input. */
  countryCode?: string;
}

export const BILLING_FORM_HEADING = 'Billing Information';

export const BILLING_FORM_FIELDS: readonly BillingFormField[] = [
  {
    id: 'full-name',
    label: 'Full name',
    required: true,
    type: 'text',
    // Letters only (Bangla + English), spaces and ' . - separators.
    mask: 'name',
    placeholder: 'আপনার নাম লিখুন....',
    autoComplete: 'name',
    iconClass: 'fa-regular fa-user',
    svgIcon: 'user',
  },
  {
    id: 'phone',
    label: 'Phone',
    required: true,
    type: 'tel',
    // Digits only: BD national number without the leading 0 (10 digits,
    // e.g. 1812345678) — the +880 dial code is rendered outside the input.
    mask: 'digits',
    maxLength: 10,
    inputMode: 'numeric',
    autoComplete: 'tel-national',
    placeholder: '1234577888',
    iconClass: 'fa-solid fa-chevron-down',
    countryCode: '+880',
  },
  {
    id: 'address',
    label: 'Address',
    required: true,
    type: 'text',
    // Letters + house numbers + postal punctuation ("House 12/A, Road-5").
    mask: 'address',
    placeholder: 'Address',
    autoComplete: 'street-address',
    iconClass: 'fa-solid fa-location-dot',
    svgIcon: 'location',
    fullColumn: true,
  },
  {
    id: 'order-notes',
    label: 'Order Notes',
    required: false,
    optional: true,
    type: 'textarea',
    // Notes stay unrestricted prose — any text is a valid note.
    mask: 'free-text',
    placeholder: 'Share your notes',
    iconClass: 'fa-regular fa-note-sticky',
    svgIcon: 'note',
    fullColumn: true,
  },
];