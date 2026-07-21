import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { CoreList } from '../../shared/core/core-list';
import { Material } from '../../shared/models/material/material';
import { MaterialService } from './material.service';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { ProductType } from '../../shared/enums/product-type';
import { UTable } from '../../shared/components/u-table/u-table';
import { ProductColorEnum } from '../../shared/enums/product-color';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ServiceCore } from '../../shared/services/service-core';

@Component({
  selector: 'app-materials',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AutoFocusModule,
    BadgeModule,
    ButtonModule,
    ConfirmDialogModule,
    ContentPanel,
    FloatLabelModule,
    InputTextModule,
    OverlayBadgeModule,
    PopoverModule,
    PaginatorModule,
    SelectModule,
    UTable
  ],
  templateUrl: './materials.html',
  styleUrl: './materials.scss'
})
export class Materials extends CoreList<Material>{

  filterForm: FormGroup;

  types = [
    { label: 'Camisas', value: ProductType.SHIRT },
    { label: 'Canecas', value: ProductType.MUG },
    { label: 'Filamento 3D', value: ProductType.FILAMENT }
  ];

  paginationOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
  ];

  productTypes = [
    { type: 'Camisa', value: ProductType.SHIRT, disabled: false },
    { type: 'Caneca', value: ProductType.MUG, disabled: false },
    { type: 'Filamento 3D', value: ProductType.FILAMENT, disabled: false }
  ];

  productColors = [
    { value: ProductColorEnum.WHITE, disabled: false },
    { value: ProductColorEnum.BLACK, disabled: false },
    { value: ProductColorEnum.YELLOW, disabled: false },
    { value: ProductColorEnum.RED, disabled: false },
    { value: ProductColorEnum.GREEN, disabled: false },
    { value: ProductColorEnum.BLUE, disabled: false },
  ];

  columnsWidth: number[] = [10, 35, 15, 15, 15, 10];

  constructor(private materialService: MaterialService,
    private fb: FormBuilder
  ) {
    super();

    this.filterForm = this.fb.group({
      name: ['', []],
      type: ['', []],
      color: ['', []]
    });
  }

  public override getService(): ServiceCore<Material> {
    return this.materialService;
  }

  public override getFilterForm(): FormGroup {
    return this.filterForm;
  }
}
