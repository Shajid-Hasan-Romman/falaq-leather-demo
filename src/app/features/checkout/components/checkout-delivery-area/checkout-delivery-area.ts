import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';

import { IcDeliveryComponent } from '../../../../shared/components/icons/ic-delivery.component';
import {
  DEFAULT_DELIVERY_AREA_ID,
  DELIVERY_AREAS,
  type DeliveryArea,
} from '../../data/delivery-areas.data';

/*
 * Tile styling split by selection state — the template never hardcodes a
 * specific area name, it simply applies the right classes from the config
 * status. Mirrors the design: selected = green tint + green border + check
 * badge; idle = white fill + light grey border.
 */

/*
 * Tile geometry comes straight from the design spec: 104×64, radius 8,
 * 1px border. With `--spacing: 4px`, 104px = spacing step 26 (`w-26`),
 * 64px = `h-16`.
 *
 * NOTE: no background lives in the base — each state below owns exactly one
 * `bg-*` class. Keeping `bg-surface` here too would let the stylesheet's
 * alphabetical order (bg-surface sorts after bg-selected) override the
 * selection fill.
 */
const TILE_BASE =
  'relative flex h-16 w-26 shrink basis-26 flex-col items-center justify-center gap-1 rounded-lg border transition-colors';

const TILE_IDLE_CLASS =
  `${TILE_BASE} border-border bg-surface hover:border-border-hover focus-visible:border-brand`;

const TILE_SELECTED_CLASS = `${TILE_BASE} border-brand bg-selected`;

/** Render model so the template stays pure presentation. */
interface DeliveryAreaTile {
  readonly area: DeliveryArea;
  readonly selected: boolean;
  readonly tileClass: string;
  readonly priceClass: string;
}

/**
 * "Select your delivery area" card of the checkout — fully config driven
 * (see `data/delivery-areas.data.ts`). Selecting a tile only updates a local
 * signal; the template renders every tile from the config array.
 */
@Component({
  selector: 'app-checkout-delivery-area',
  imports: [IcDeliveryComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-delivery-area.html',
  styleUrl: './checkout-delivery-area.scss',
})
export class CheckoutDeliveryArea {
  readonly areaChange = output<DeliveryArea>();
  /** The selectable areas; defaults to the design config. */
  readonly areas = signal<readonly DeliveryArea[]>(DELIVERY_AREAS);

  /** Id of the currently selected area (design default: Inside Dhaka). */
  private readonly selectedAreaId = signal<DeliveryArea['id']>(DEFAULT_DELIVERY_AREA_ID);

  protected readonly tiles = computed<readonly DeliveryAreaTile[]>(() =>
    this.areas().map((area) => {
      const selected = area.id === this.selectedAreaId();
      return {
        area,
        selected,
        tileClass: selected ? TILE_SELECTED_CLASS : TILE_IDLE_CLASS,
        priceClass: selected ? 'text-brand' : 'text-ink',
      };
    }),
  );

  protected selectArea(area: DeliveryArea): void {
    this.selectedAreaId.set(area.id);
    this.areaChange.emit(area);
  }
}