import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailValidation } from './email-validation';

describe('EmailValidation', () => {
  let component: EmailValidation;
  let fixture: ComponentFixture<EmailValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailValidation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailValidation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
