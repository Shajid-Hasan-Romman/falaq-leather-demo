import { ChangeDetectionStrategy, Component } from '@angular/core';

interface StackItem {
  readonly label: string;
  readonly detail: string;
}

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  /** What the scaffold ships with — rendered as the "wired up" checklist. */
  protected readonly stack: readonly StackItem[] = [
    { label: 'Angular 22', detail: 'Standalone components, OnPush, signals' },
    { label: 'SSR + hydration', detail: 'Server-rendered HTML with event replay' },
    { label: 'Tailwind v4', detail: 'Design tokens compiled from theme.css' },
    { label: 'Typed HTTP layer', detail: 'HttpClient + environments, ready for the API' },
    { label: 'Feature architecture', detail: 'core / shared / features / layouts' },
  ];
}
