import { Component } from '@angular/core';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.html',
  styleUrls: ['./product-features.scss'],
  standalone: false
})
export class ProductFeatures {

  features = [
    {
      icon: 'icons/Harb-icon.png',
      title: '100% Natural',
      subtitle: 'প্রাকৃতিক উপাদানে তৈরি'
    },
    {
      icon: 'icons/Amphora-icon.png',
      title: 'Authentic Homemade Taste',
      subtitle: 'ঘরোয়া স্বাদের ঐতিহ্য'
    },
    {
      icon: 'icons/Plate-icon.png',
      title: 'Perfect With Every Meal',
      subtitle: 'প্রতিদিনের খাবারের সঙ্গে উপভোগ করুন'
    }
  ];

}