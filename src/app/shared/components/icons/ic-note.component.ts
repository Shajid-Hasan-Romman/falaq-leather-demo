import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shared SVG icon — "note" (pencil / edit), used in form fields such as the
 * checkout "Order Notes" textarea. Figma-generated style icon primitive:
 * inline template, `standalone`, driven by signal `input()`s.
 *
 * - `className` sizes the svg via Tailwind (design base is 20×20 → `size-5`)
 * - `stroke` themes the line artwork (design secondary-grey by default)
 */
@Component({
  selector: 'app-ic-note',
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
        d="M2.91406 15.8243V17.0866H4.17633C5.1982 17.0866 5.70915 17.0866 6.16857 16.8963C6.628 16.706 6.98929 16.3447 7.71186 15.6221L15.9318 7.40216C16.6673 6.66669 17.035 6.29895 17.0757 5.84763C17.0824 5.77302 17.0824 5.69796 17.0757 5.62335C17.035 5.17203 16.6673 4.80429 15.9318 4.06882C15.1963 3.33336 14.8286 2.96562 14.3773 2.92497C14.3027 2.91824 14.2277 2.91824 14.153 2.92497C13.7017 2.96562 13.334 3.33336 12.5985 4.06882L4.37853 12.2888C3.65595 13.0113 3.29467 13.3727 3.10436 13.8321C2.91406 14.2915 2.91406 14.8024 2.91406 15.8243Z"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.25 5.41992L14.5833 8.75326"
        [attr.stroke]="stroke()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcNoteComponent {
  /** Sizing utility applied to the svg (design base is 20×20 = `size-5`). */
  readonly className = input<string>('size-5');

  /** Stroke color of the line artwork (design grey by default). */
  readonly stroke = input('#637381');
}