import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface LatestCategory {
  readonly id: string;
  readonly label: string;
  readonly path: string;
}

export interface LatestProduct {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly image: string;
  readonly alt: string;
  readonly path: string;
}

@Component({
  selector: 'app-latest-arrivals',
  imports: [RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './latest-arrivals.html',
  styleUrl: './latest-arrivals.scss',
})
export class LatestArrivals {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly promoVideo =
    viewChild<ElementRef<HTMLVideoElement>>('promoVideo');

  /** 1 mobile · 2 tablet · 4 desktop — mirrors grid breakpoints. */
  private readonly visibleCount = signal(4);

  readonly bannerImage = '/asset/latest/29.03.2026.jpeg';

  readonly videoSrc =
    '/asset/video/' +
    encodeURIComponent('Shoes by 2GO - Theatrical Ad Film _ Commercial.mp4');

  readonly startIndex = signal(0);

  readonly categories: readonly LatestCategory[] = [
    { id: 'mens', label: 'MENS', path: '/shop/men' },
    { id: 'women', label: 'WOMEN', path: '/shop/women' },
    { id: 'children', label: 'CHILDREN', path: '/shop/children' },
  ];

  /** Card order matches AmarBay Latest Arrivals strip. */
  readonly products: readonly LatestProduct[] = [
    {
      id: 'nora-sandal',
      name: 'Ladies Open Heel - Sandal - Nora',
      price: 4490,
      currency: 'BDT',
      image: '/asset/product-category/Hill/_DSC7878_2Zi53ga.jpg',
      alt: 'Ladies Open Heel Sandal Nora',
      path: '/product-details/ladies-open-heel---sandal---nora-248544801',
    },
    {
      id: 'nora-mid',
      name: 'Ladies Closed - Mid Heel - Nora',
      price: 3490,
      currency: 'BDT',
      image: '/asset/product-category/hill%202/_DSC9480.jpg',
      alt: 'Ladies Closed Mid Heel Nora',
      path: '/product-details/ladies-closed---mid-heel---nora-248544802',
    },
    {
      id: 'steller-slide',
      name: 'Men Summer - Sandal - Steller',
      price: 1890,
      currency: 'BDT',
      image: '/asset/product-category/sandel/_DSC2337.jpg',
      alt: 'Men Summer Sandal Steller',
      path: '/product-details/men-summer---sandal---steller-248544803',
    },
    {
      id: 'namira',
      name: 'Ladies Open Heel - Slip On - Namira',
      price: 3990,
      currency: 'BDT',
      image:
        '/asset/product-category/Hill%203/_DSC5597_0001_Resize_Website_0001__DSC4318.jpg',
      alt: 'Ladies Open Heel Slip On Namira',
      path: '/product-details/ladies-open-heel---slip-on---namira-248544804',
    },
    {
      id: 'camellia',
      name: 'Ladies Closed - Mid Heel - Camellia',
      price: 1990,
      currency: 'BDT',
      image: '/asset/product-category/Hill%204/_DSC9522.jpg',
      alt: 'Ladies Closed Mid Heel Camellia',
      path: '/product-details/ladies-closed---mid-heel---camellia-248544805',
    },
    {
      id: 'steller-mule',
      name: 'Men Summer - Sandal - Steller',
      price: 2490,
      currency: 'BDT',
      image: '/asset/product-category/Sandel%202/_DSC9586.jpg',
      alt: 'Men Summer Sandal Steller mule',
      path: '/product-details/men-summer---sandal---steller-248544806',
    },
  ];

  readonly canPrev = computed(() => this.startIndex() > 0);

  readonly canNext = computed(
    () => this.startIndex() + this.visibleCount() < this.products.length,
  );

  readonly visibleProducts = computed(() => {
    const start = this.startIndex();
    return this.products.slice(start, start + this.visibleCount());
  });

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.startSilentAutoplay();

      const updateVisibleCount = (): void => {
        const width = window.innerWidth;
        const next = width < 576 ? 1 : width < 992 ? 2 : 4;
        this.visibleCount.set(next);
        const maxStart = Math.max(0, this.products.length - next);
        if (this.startIndex() > maxStart) {
          this.startIndex.set(maxStart);
        }
      };

      updateVisibleCount();
      window.addEventListener('resize', updateVisibleCount);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', updateVisibleCount);
      });
    });
  }

  prev(): void {
    if (!this.canPrev()) {
      return;
    }
    this.startIndex.update((i) => Math.max(0, i - 1));
  }

  next(): void {
    if (!this.canNext()) {
      return;
    }
    const maxStart = Math.max(0, this.products.length - this.visibleCount());
    this.startIndex.update((i) => Math.min(maxStart, i + 1));
  }

  private startSilentAutoplay(): void {
    const video = this.promoVideo()?.nativeElement;
    if (!video) {
      return;
    }

    const forceMute = (): void => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.controls = false;
    };

    forceMute();

    // Keep audio off permanently — some browsers briefly unmute on play/seek.
    const keepSilent = (): void => {
      if (!video.muted || video.volume > 0) {
        forceMute();
      }
    };

    video.addEventListener('volumechange', keepSilent);
    video.addEventListener('play', forceMute);
    video.addEventListener('playing', forceMute);
    this.destroyRef.onDestroy(() => {
      video.removeEventListener('volumechange', keepSilent);
      video.removeEventListener('play', forceMute);
      video.removeEventListener('playing', forceMute);
    });

    const play = (): void => {
      forceMute();
      void video.play().catch(() => {
        forceMute();
        void video.play().catch(() => undefined);
      });
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener('canplay', play, { once: true });
    }
  }
}
