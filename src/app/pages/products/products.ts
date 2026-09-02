import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { CoreList } from '../../shared/core/core-list';
import { Product } from '../../shared/models/product/product';
import { ProductItemCardList } from '../../shared/components/product-item-card-list/product-item-card-list';
import { ProductService } from './product.service';
import { ServiceCore } from '../../shared/services/service-core';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ButtonModule, MenuModule, ProductItemCardList, PaginatorModule, ContentPanel],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products extends CoreList<Product> {

  filterForm: FormGroup;

  constructor(private service: ProductService, private fb: FormBuilder) {
    super();
    this.filterForm = this.fb.group({
      name: ['', []]
    });
  }

  public override getService(): ServiceCore<Product> {
    return this.service;
  }
  public override getFilterForm(): FormGroup {
    return this.filterForm;
  }
}
