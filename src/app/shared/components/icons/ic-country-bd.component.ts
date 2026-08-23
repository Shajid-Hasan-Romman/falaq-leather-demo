import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared SVG icon — "country bd" (Bangladesh flag marker), used in the checkout
 * billing phone field before the dialing code. Figma-generated style icon
 * primitive: inline template, `standalone`, driven by signal `input()`s.
 *
 * - `className` sizes the svg via Tailwind (default 24×24 → `size-6`)
 * - Uses fixed emblem fills (green field + red circle) straight from the design
 * - clip/mask ids are unique per instance so multiple same-page usages don't
 *   cross-reference each other
 */
@Component({
  selector: 'app-ic-country-bd',
  standalone: true,
  template: `
    <svg
      [attr.class]="className()"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g [attr.clip-path]="'url(#' + clipId + ')'">
        <rect width="24" height="24" rx="12" fill="white" />
        <rect x="-5" y="-0.140625" width="34" height="24.2857" rx="2" fill="white" />
        <mask
          [attr.id]="maskId"
          style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="-5"
          y="-1"
          width="34"
          height="26"
        >
          <rect x="-5" y="-0.140625" width="34" height="24.2857" rx="2" fill="white" />
        </mask>
        <g [attr.mask]="'url(#' + maskId + ')'">
          <rect x="-5" y="-0.140625" width="34" height="24.2857" fill="#128363" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.7857 19.5714C15.8095 19.5714 19.0714 16.3095 19.0714 12.2857C19.0714 8.26193 15.8095 5 11.7857 5C7.76193 5 4.5 8.26193 4.5 12.2857C4.5 16.3095 7.76193 19.5714 11.7857 19.5714Z"
            fill="#F23C53"
          />
        </g>
      </g>
      <defs>
        <clipPath [attr.id]="clipId">
          <rect width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcCountryBdComponent {
  private static idSeq = 0;

  /** Sizing utility applied to the svg (design default is 24×24 = `size-6`). */
  readonly className = input<string>('size-6');

  protected readonly clipId = `ic-country-bd-clip-${IcCountryBdComponent.idSeq++}`;
  protected readonly maskId = `ic-country-bd-mask-${IcCountryBdComponent.idSeq++}`;
}