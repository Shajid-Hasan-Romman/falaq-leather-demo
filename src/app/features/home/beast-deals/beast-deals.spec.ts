import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BeastDeals } from './beast-deals';

describe('BeastDeals', () => {
  let component: BeastDeals;
  let fixture: ComponentFixture<BeastDeals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeastDeals],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BeastDeals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
