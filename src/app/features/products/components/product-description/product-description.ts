import { Component } from '@angular/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.html',
  styleUrls: ['./product-description.scss'],
  standalone: false
})
export class ProductDescription {

  activeTab = 'description';

  features = [
    'প্রিমিয়াম মানের খাঁটি দেশি মরিচ',
    'প্রাকৃতিক উপাদানে প্রস্তুত',
    'খাঁটি সরিষার তেল ও দেশি মসলা ব্যবহার',
    'কোনো কৃত্রিম রং বা সংরক্ষণকারী নেই',
    'ভাত, খিচুড়ি, রুটি ও নাস্তার সাথে উপযোগী'
  ];

}