import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ShopBrand {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly logo: string;
  readonly alt: string;
}

@Component({
  selector: 'app-shop-brands',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shop-brands.html',
  styleUrl: './shop-brands.scss',
})
export class ShopBrands {
  readonly brands: readonly ShopBrand[] = [
    {
      id: 'elegante',
      name: 'ELEGANTE',
      description: 'Classic, posh but decent stylish segment.',
      logo: '/asset/brands/elegante.png',
      alt: 'Elegante logo',
    },
    {
      id: 'lara-clara',
      name: 'LARA CLARA',
      description: 'Talks about the blending of fashion & latest trends.',
      logo: '/asset/brands/lara-clara.png',
      alt: 'Lara Clara logo',
    },
    {
      id: 'bay-soft',
      name: 'BAY SOFT',
      description: 'Comfortable high quality leather footwear',
      logo: '/asset/brands/bay-soft.png',
      alt: 'Bay Soft logo',
    },
    {
      id: 'striker',
      name: 'STRIKER',
      description: 'Healthy Lifestyle',
      logo: '/asset/brands/striker.png',
      alt: 'Striker logo',
    },
  ];
}
