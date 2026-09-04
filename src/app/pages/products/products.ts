import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PaginatorModule } from 'primeng/paginator';
import { PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { CoreList } from '../../shared/core/core-list';
import { Product } from '../../shared/models/product/product';
import { ProductItemCardList } from '../../shared/components/product-item-card-list/product-item-card-list';
import { ProductService } from './product.service';
import { ProductType } from '../../shared/enums/product-type';
import { ServiceCore } from '../../shared/services/service-core';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AutoFocusModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    MenuModule,
    ProductItemCardList,
    OverlayBadgeModule,
    PaginatorModule,
    PopoverModule,
    SelectModule,
    ContentPanel
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products extends CoreList<Product> {

  filterForm: FormGroup;

  productTypes = [
    { type: 'Camisa', value: ProductType.SHIRT, disabled: false },
    { type: 'Caneca', value: ProductType.MUG, disabled: false },
    { type: 'Filamento 3D', value: ProductType.FILAMENT, disabled: true }
  ];

  constructor(private service: ProductService, private fb: FormBuilder) {
    super();
    this.filterForm = this.fb.group({
      name: ['', []],
      description: ['', []],
      type: ['', []],
      minPrice: [null, []],
      maxPrice: [null, []]
    });
  }

  public override getService(): ServiceCore<Product> {
    return this.service;
  }
  public override getFilterForm(): FormGroup {
    return this.filterForm;
  }
}
