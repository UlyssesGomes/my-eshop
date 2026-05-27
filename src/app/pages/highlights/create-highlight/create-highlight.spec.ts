import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHighlight } from './create-highlight';

describe('CreateHighlight', () => {
  let component: CreateHighlight;
  let fixture: ComponentFixture<CreateHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHighlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHighlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
