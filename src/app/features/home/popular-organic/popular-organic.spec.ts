import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularOrganic } from './popular-organic';

describe('PopularOrganic', () => {
  let component: PopularOrganic;
  let fixture: ComponentFixture<PopularOrganic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularOrganic],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularOrganic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
