import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FeaturedCategories } from './featured-categories';

describe('FeaturedCategories', () => {
  let component: FeaturedCategories;
  let fixture: ComponentFixture<FeaturedCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedCategories],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
