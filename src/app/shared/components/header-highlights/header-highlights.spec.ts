import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHighlights } from './header-highlights';

describe('HeaderHighlights', () => {
  let component: HeaderHighlights;
  let fixture: ComponentFixture<HeaderHighlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHighlights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderHighlights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
