import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared SVG icon — "cart" (plus on a shopping bag), used for the storefront
 * cart affordance. Figma-generated style icon primitive:
 *
 * - `className` sets the sizing utility (default `size-8` = 32×32)
 * - `framed` toggles the gradient check mark; with `framed` the viewBox scales
 *   to 33×33 (the circle frame) and the mark path is translated into it.
 */
@Component({
  selector: 'app-cart-icon',
  standalone: true,
  template: `
    <svg
      [attr.class]="className()"
      xmlns="http://www.w3.org/2000/svg"
      [attr.viewBox]="framed() ? '0 0 33 33' : '0 0 18 18'"
      fill="none"
      overflow="visible"
      [attr.preserveAspectRatio]="framed() ? 'none' : 'xMidYMid meet'"
      aria-hidden="true"
    >
      @if (framed()) {
        <circle
          cx="16.5"
          cy="16.5"
          r="15.5"
          fill="white"
          fill-opacity="0.32"
          [attr.stroke]="'url(#' + gradientId + ')'"
          stroke-width="1"
        />
      }
      <path
        [attr.transform]="framed() ? 'translate(7.333 7.333)' : null"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 5.83333C10 6.29167 9.625 6.66667 9.16667 6.66667C8.70833 6.66667 8.33333 6.29167 8.33333 5.83333V4.16667H6.66667C6.20833 4.16667 5.83333 3.79167 5.83333 3.33333C5.83333 2.875 6.20833 2.5 6.66667 2.5H8.33333V0.833333C8.33333 0.375 8.70833 0 9.16667 0C9.625 0 10 0.375 10 0.833333V2.5H11.6667C12.125 2.5 12.5 2.875 12.5 3.33333C12.5 3.79167 12.125 4.16667 11.6667 4.16667H10V5.833333ZM3.34167 15.8333C3.34167 14.9167 4.08333 14.1667 5 14.1667C5.91667 14.1667 6.66667 14.9167 6.66667 15.8333C6.66667 16.75 5.91667 17.5 5 17.5C4.08333 17.5 3.34167 16.75 3.34167 15.8333ZM13.3333 14.1667C12.4167 14.1667 11.675 14.9167 11.675 15.8333C11.675 16.75 12.4167 17.5 13.3333 17.5C14.25 17.5 15 16.75 15 15.8333C15 14.9167 14.25 14.1667 13.3333 14.1667ZM12.125 10H5.916667L5 11.6667H14.1667C14.625 11.6667 15 12.0417 15 12.5C15 12.9583 14.625 13.3333 14.1667 13.3333H5C3.73333 13.3333 2.93333 11.975 3.54167 10.8583L4.66667 8.825L1.66667 2.5H0.833333C0.375 2.5 0 2.125 0 1.66667C0 1.20833 0.375 0.833333 0.833333 0.833333H2.2C2.51667 0.833333 2.81667 1.01667 2.95 1.30833L6.275 8.33333H12.125L14.95 3.225C15.1667 2.825 15.675 2.68333 16.075 2.9C16.475 3.125 16.625 3.63333 16.4 4.03333L12.125 10Z"
        fill="#212B36"
      />
      <defs>
        <linearGradient
          [attr.id]="gradientId"
          x1="16.5"
          y1="1"
          x2="16.5"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EEEEEE" />
          <stop offset="1" stop-color="#159758" />
        </linearGradient>
      </defs>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartIconComponent {
  private static idSeq = 0;

  protected readonly gradientId = `cart-grad-${CartIconComponent.idSeq++}`;
  readonly className = input<string>('size-8');
  readonly framed = input(true);
}