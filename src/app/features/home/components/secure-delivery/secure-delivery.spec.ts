import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureDelivery } from './secure-delivery';

describe('SecureDelivery', () => {
  let component: SecureDelivery;
  let fixture: ComponentFixture<SecureDelivery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecureDelivery],
    }).compileComponents();

    fixture = TestBed.createComponent(SecureDelivery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
