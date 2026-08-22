import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(
    public cartService: CartService,
    private router: Router,
  ) {}

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
