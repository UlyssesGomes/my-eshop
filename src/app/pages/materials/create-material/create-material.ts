import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { CoreCreateEdit } from '../../../shared/core/core-create-edit';
import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { Material } from '../../../shared/models/material/material';
import { MaterialService } from '../material.service';
import { ProductType } from '../../../shared/enums/product-type';
import { ProductSizeEnum } from '../../../shared/enums/product-size';
import { ProductColorEnum } from '../../../shared/enums/product-color';
import { ServiceCore } from '../../../shared/services/service-core';

@Component({
  selector: 'app-create-material',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ContentPanel,
    ErrorReaderPipe,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    SelectModule
  ],
  templateUrl: './create-material.html',
  styleUrl: './create-material.scss'
})
export class CreateMaterial extends CoreCreateEdit<Material> {

  productTypes = [
    { type: 'Camisa', value: ProductType.SHIRT, disabled: false },
    { type: 'Caneca', value: ProductType.MUG, disabled: false },
    { type: 'Filamento 3D', value: ProductType.FILAMENT, disabled: false }
  ];

  productSizes = [
    { value: ProductSizeEnum.PP, disabled: false},
    { value: ProductSizeEnum.P, disabled: false},
    { value: ProductSizeEnum.M, disabled: false},
    { value: ProductSizeEnum.G, disabled: false},
    { value: ProductSizeEnum.GG, disabled: false},
  ];

  productColors = [
    { value: ProductColorEnum.WHITE,  disabled: false},
    { value: ProductColorEnum.BLACK, disabled: false},
    { value: ProductColorEnum.YELLOW, disabled: false},
    { value: ProductColorEnum.RED, disabled: false},
    { value: ProductColorEnum.GREEN,  disabled: false},
    { value: ProductColorEnum.BLUE,  disabled: false},
  ];

  typeName?: string;
  colorName?: string;
  sizeName?: string;

  typeShirt = ProductType.SHIRT;
  
  constructor(private materialService: MaterialService)
  {
    super();
  }

  addSizeControl() {
    this.form.addControl('size', this.fb.control([null, [Validators.required]]));
  }
  
  materialChange(event: SelectChangeEvent) {
    if(event.value === ProductType.SHIRT) {
      if(this.form.get('size') === null)
        this.form.addControl('size', this.fb.control(null, [Validators.required]));
    }
    else if(this.form.get('size')) {
      this.form.removeControl('size');
    }
  }

  override preLoadData(material: Material): void {
    if(material.type === ProductType.SHIRT) {
      this.addSizeControl();
    }
  }

  override getService(): ServiceCore<Material> {
    return this.materialService;
  }

  override defineForm(): FormGroup {
    return this.fb.group({
      id: [null, []],
      name: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
      type: [null, [Validators.required]],
      color: [null, [Validators.required]],
      quantity: [0, [Validators.required]],
    });
  }

  override featureName(): string {
    return 'Materials';
  }
}
