import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared SVG icon — "location" (map pin), used in form fields such as the
 * checkout "Address" input. Figma-generated style icon primitive: inline
 * template, `standalone`, driven by signal `input()`s.
 *
 * - `className` sizes the svg via Tailwind (design base is 20×20 → `size-5`)
 * - `stroke` themes the line artwork (design secondary-grey by default)
 */
@Component({
  selector: 'app-ic-location',
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
        d="M11.3481 17.8091C10.9867 18.1474 10.5037 18.3366 10.0009 18.3366C9.49817 18.3366 9.01517 18.1474 8.65375 17.8091C5.34418 14.6916 0.908967 11.209 3.07189 6.15297C4.24136 3.41922 7.04862 1.66992 10.0009 1.66992C12.9532 1.66992 15.7605 3.41922 16.93 6.15297C19.0902 11.2027 14.6658 14.7023 11.3481 17.8091Z"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
      />
      <path
        d="M12.9154 9.16667C12.9154 10.7775 11.6095 12.0833 9.9987 12.0833C8.38786 12.0833 7.08203 10.7775 7.08203 9.16667C7.08203 7.55583 8.38786 6.25 9.9987 6.25C11.6095 6.25 12.9154 7.55583 12.9154 9.16667Z"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcLocationComponent {
  /** Sizing utility applied to the svg (design base is 20×20 = `size-5`). */
  readonly className = input<string>('size-5');

  /** Stroke color of the line artwork (design grey by default). */
  readonly stroke = input('#637381');
}