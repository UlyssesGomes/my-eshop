import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoCommonForm } from './user-info-common-form';

describe('UserInfoCommonForm', () => {
  let component: UserInfoCommonForm;
  let fixture: ComponentFixture<UserInfoCommonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoCommonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoCommonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
