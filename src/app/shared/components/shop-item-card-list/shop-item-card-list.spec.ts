import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemCardList } from './shop-item-card-list';

describe('ShopItemCardList', () => {
  let component: ShopItemCardList;
  let fixture: ComponentFixture<ShopItemCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemCardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopItemCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
