import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressesCommonForm } from './user-addresses-common-form';

describe('UserAddressesCommonForm', () => {
  let component: UserAddressesCommonForm;
  let fixture: ComponentFixture<UserAddressesCommonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressesCommonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddressesCommonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
