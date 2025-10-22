import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UTable } from './u-table';

describe('UTable', () => {
  let component: UTable;
  let fixture: ComponentFixture<UTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
