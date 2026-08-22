import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-bar',
  templateUrl: './feature-bar.html',
  styleUrls: ['./feature-bar.scss'],
  standalone: false
})
export class FeatureBar {

  features = [
    {
      icon: 'fa-solid fa-truck-fast',
      title: 'Fast Delivery',
      description: '২৪-৪৮ ঘণ্টার মধ্যে দ্রুত ডেলিভারি'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Cash on Delivery',
      description: 'পণ্য হাতে পেয়ে পেমেন্ট করুন'
    },
    {
      icon: 'fa-solid fa-badge-check',
      title: 'Quality Guarantee',
      description: 'স্বাদ ও মানের নিশ্চয়তা'
    }
  ];

}