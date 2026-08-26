import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface HeroSlide {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly path: string;
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private readonly autoplayMs = 6500;

  readonly activeIndex = signal(0);

  readonly slides: readonly HeroSlide[] = [
    {
      id: 'hero-1',
      src: '/asset/hero/Bay-Web-Hero-Image-Set-001.jpg_VUyybzg.jpeg',
      alt: 'Bay — Wear the Moment',
      path: '/shop',
    },
    {
      id: 'hero-2',
      src: '/asset/hero/Bay-Web-Hero-Image-Set-001.2.jpg_6FZCtbg.jpeg',
      alt: 'Bay — Own the Occasion',
      path: '/shop',
    },
    {
      id: 'hero-3',
      src: '/asset/hero/Bay-Web-Hero-Image-Set-001.3.jpg_Q6mN7Kv.jpeg',
      alt: 'Bay — Unbox the Happiness',
      path: '/shop',
    },
  ];

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.startAutoplay();
      this.destroyRef.onDestroy(() => this.stopAutoplay());
    });
  }

  goTo(index: number): void {
    const total = this.slides.length;
    const next = ((index % total) + total) % total;
    this.activeIndex.set(next);
    this.restartAutoplay();
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      this.activeIndex.update((i) => (i + 1) % this.slides.length);
    }, this.autoplayMs);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer !== null) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private restartAutoplay(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.startAutoplay();
  }
}
