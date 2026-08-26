import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promo-banner',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './promo-banner.html',
  styleUrl: './promo-banner.scss',
})
export class PromoBanner {
  /** Lifestyle creative — Bay + OUTDOOR COLLECTION are baked into the art. */
  readonly imageSrc = '/asset/outdoor/WEB-Landing-2-DrM9Yrmh.jpg';

  readonly explorePath = '/shop';
}
