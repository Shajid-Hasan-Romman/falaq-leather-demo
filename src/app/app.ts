import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layouts/main-layout/header/header";
import { Footer } from './layouts/main-layout/footer/footer';
import { Hero } from "./features/home/hero/hero";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer, Hero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
