import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultifieldPanel } from './multifield-panel';

describe('MultifieldPanel', () => {
  let component: MultifieldPanel;
  let fixture: ComponentFixture<MultifieldPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultifieldPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultifieldPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
