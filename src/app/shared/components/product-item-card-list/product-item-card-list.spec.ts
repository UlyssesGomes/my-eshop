import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemCardList } from './product-item-card-list';

describe('ProductItemCardList', () => {
  let component: ProductItemCardList;
  let fixture: ComponentFixture<ProductItemCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItemCardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemCardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
