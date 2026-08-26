import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FooterLink {
  readonly label: string;
  readonly path: string;
  readonly external?: boolean;
}

export interface FooterColumn {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: 'instagram' | 'facebook' | 'twitter' | 'pinterest' | 'youtube';
}

export interface PaymentMethod {
  readonly label: string;
  readonly tone: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly companyColumn: FooterColumn = {
    title: 'Falaq Leather Ltd.',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms Of Use', path: '/terms' },
      { label: 'Limited Warranty', path: '/warranty' },
    ],
  };

  readonly careColumn: FooterColumn = {
    title: 'Customer Care',
    links: [
      { label: 'Contact Us', path: '/contact' },
      { label: 'Purchase Process', path: '/help/purchase' },
      { label: '+8801700000000', path: 'tel:+8801700000000', external: true },
    ],
  };

  readonly infoColumn: FooterColumn = {
    title: 'Customer Information',
    links: [
      { label: 'Returns & Exchanges', path: '/help/returns' },
      { label: 'Shipping Information', path: '/help/shipping' },
      { label: 'Offers & Promotions', path: '/offers' },
      { label: 'Size Charts', path: '/help/size-guide' },
      { label: 'Gift Voucher', path: '/gift-voucher' },
    ],
  };

  readonly socialLinks: readonly SocialLink[] = [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { label: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
    { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  ];

  readonly followLinks: readonly FooterLink[] = [
    { label: 'Sign up for SMS', path: '/sms-signup' },
    { label: 'FIND OUR SHOP', path: '/stores' },
  ];

  readonly paymentMethods: readonly PaymentMethod[] = [
    { label: 'VISA', tone: '#1a1f71' },
    { label: 'Mastercard', tone: '#eb001b' },
    { label: 'Amex', tone: '#2e77bc' },
    { label: 'Nagad', tone: '#ed1c24' },
    { label: 'Rocket', tone: '#8c3494' },
    { label: 'bKash', tone: '#e2136e' },
  ];

  readonly copyrightYear = new Date().getFullYear();
}
