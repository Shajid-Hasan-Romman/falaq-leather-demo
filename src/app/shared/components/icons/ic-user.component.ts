import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared SVG icon — "user" (profile silhouette), used in form fields such as
 * the checkout "Full name" input. Figma-generated style icon primitive:
 * inline template, `standalone`, driven by signal `input()`s.
 *
 * - `className` sizes the svg via Tailwind (design base is 20×20 → `size-5`)
 * - `stroke` themes the line artwork (design secondary-grey by default)
 */
@Component({
  selector: 'app-ic-user',
  standalone: true,
  template: `
    <svg
      [attr.class]="className()"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.1654 7.08659C14.1654 4.78541 12.2999 2.91992 9.9987 2.91992C7.69751 2.91992 5.83203 4.78541 5.83203 7.08659C5.83203 9.38776 7.69766 11.2533 9.9987 11.2533C12.2999 11.2533 14.1654 9.38776 14.1654 7.08659Z"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.8346 17.0833C15.8346 13.8617 13.223 11.25 10.0013 11.25C6.77964 11.25 4.16797 13.8617 4.16797 17.0833"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcUserComponent {
  /** Sizing utility applied to the svg (design base is 20×20 = `size-5`). */
  readonly className = input<string>('size-5');

  /** Stroke color of the line artwork (design grey by default). */
  readonly stroke = input('#637381');
}