import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
  standalone: true,
  imports: [
    RouterOutlet,  // Import RouterOutlet instead of using router-outlet directly
    Header,
    Footer
  ]
})
export class MainLayout {
  // your component logic
}