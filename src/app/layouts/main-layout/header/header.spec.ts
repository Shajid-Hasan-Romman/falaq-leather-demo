import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let mockRouter: Router;

  beforeEach(async () => {
    mockRouter = { navigate: vi.fn() } as unknown as Router;

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the cart page when goToCart is called', () => {
    component.goToCart();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cart']);
  });
});
