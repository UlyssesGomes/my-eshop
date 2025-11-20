import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommonForm } from './user-common-form';

describe('UserCommonForm', () => {
  let component: UserCommonForm;
  let fixture: ComponentFixture<UserCommonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCommonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCommonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
