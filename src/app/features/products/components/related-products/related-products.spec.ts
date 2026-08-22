import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProducts } from './related-products';

describe('RelatedProducts', () => {
  let component: RelatedProducts;
  let fixture: ComponentFixture<RelatedProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
