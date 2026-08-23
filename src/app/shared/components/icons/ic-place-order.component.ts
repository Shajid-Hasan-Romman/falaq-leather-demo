import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared SVG icon — "place order" (box with tick), used on the checkout
 * "Place Order" action button. Figma-generated style icon primitive: inline
 * template, `standalone`, driven by signal `input()`s.
 *
 * - `className` sizes the svg via Tailwind (design base is 24×24 → `size-6`)
 * - `stroke` themes the line artwork (white by default — sits on the green
 *   button fill)
 */
@Component({
  selector: 'app-ic-place-order',
  standalone: true,
  template: `
    <svg
      [attr.class]="className()"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22.9992 17.91C23.0192 18.66 22.8192 19.37 22.4592 19.98C22.2592 20.34 21.9892 20.67 21.6892 20.94C20.9992 21.58 20.0892 21.97 19.0792 22C17.6192 22.03 16.3292 21.28 15.6192 20.13C15.2392 19.54 15.0092 18.83 14.9992 18.08C14.9692 16.82 15.5292 15.68 16.4292 14.93C17.1092 14.37 17.9692 14.02 18.9092 14C21.1192 13.95 22.9492 15.7 22.9992 17.91Z"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.4395 18.03L18.4495 18.99L20.5395 16.97"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.16992 7.44L11.9999 12.55L20.7699 7.46997"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 21.61V12.54"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.6106 9.17V14.83C21.6106 14.88 21.6106 14.92 21.6006 14.97C20.9006 14.36 20.0006 14 19.0006 14C18.0606 14 17.1906 14.33 16.5006 14.88C15.5806 15.61 15.0006 16.74 15.0006 18C15.0006 18.75 15.2106 19.46 15.5806 20.06C15.6706 20.22 15.7806 20.37 15.9006 20.51L14.0706 21.52C12.9306 22.16 11.0706 22.16 9.9306 21.52L4.59061 18.56C3.38061 17.89 2.39062 16.21 2.39062 14.83V9.17C2.39062 7.79 3.38061 6.11002 4.59061 5.44002L9.9306 2.48C11.0706 1.84 12.9306 1.84 14.0706 2.48L19.4106 5.44002C20.6206 6.11002 21.6106 7.79 21.6106 9.17Z"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcPlaceOrderComponent {
  /** Sizing utility applied to the svg (design default is 24×24 = `size-6`). */
  readonly className = input<string>('size-6');

  /** Stroke color of the line artwork (white on the green button). */
  readonly stroke = input('white');
}