import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBlock } from './loading-block';

describe('LoadingBlock', () => {
  let component: LoadingBlock;
  let fixture: ComponentFixture<LoadingBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
