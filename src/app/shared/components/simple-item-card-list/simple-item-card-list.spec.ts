import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleItemCardList } from './simple-item-card-list';

describe('SimpleItemCardList', () => {
  let component: SimpleItemCardList;
  let fixture: ComponentFixture<SimpleItemCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleItemCardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleItemCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
