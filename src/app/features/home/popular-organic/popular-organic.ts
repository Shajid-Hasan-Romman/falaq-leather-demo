import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-organic',
  imports: [],
  templateUrl: './popular-organic.html',
  styleUrl: './popular-organic.scss',
})
export class PopularOrganic {
  centerImage = 'basket 4.png';

  leftFeatures = [
  {
    title: 'Organic Garlic',
    description: 'Organic soybean oil ( Glycine saja ) Cold Pressed & Refined',
    image: 'garlic-with-parsley-spices-isolated-white 1.png'
  },
  {
    title: 'Black cumin',
    description: 'Organic soybean oil ( Glycine saja ) Cold Pressed & Refined',
    image: 'black cumin.png'
  }
];

rightFeatures = [
  {
    title: 'Pure Honey',
    description: 'For external use only. Keep out of reach of children.',
    image: 'pure.png'
  },
  {
    title: 'PROMOTES RELAXATION',
    description: 'US Organic Soybean oil is beneficial for all skin types.',
    image: 'masla.png'
  }
];
}
