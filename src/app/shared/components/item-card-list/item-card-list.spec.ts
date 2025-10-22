import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardList } from './item-card-list';

describe('ItemCardList', () => {
  let component: ItemCardList;
  let fixture: ComponentFixture<ItemCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
