import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-best-sellers',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './best-sellers.html',
  styleUrl: './best-sellers.scss',
})
export class BestSellers {}
