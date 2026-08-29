import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LandingDetails } from './landing-page-details/landing-details';

@Component({
  selector: 'app-landing',
  imports: [LandingDetails],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}
