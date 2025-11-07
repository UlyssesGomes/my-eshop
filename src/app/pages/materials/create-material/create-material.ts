import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { MessageModule } from 'primeng/message';
import { ProductType } from '../../../shared/enums/product-type';
import { ProductSizeEnum } from '../../../shared/enums/product-size';

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
export class CreateMaterial implements OnInit {
  
  form!: FormGroup;

  productTypes = [
    { type: 'Camisa', value: ProductType.SHIRT, disabled: false },
    { type: 'Caneca', value: ProductType.MUG, disabled: false },
    { type: 'Impressão 3D', value: ProductType.PRINT_3D, disabled: false }
  ];

  productSizes = [
    { value: ProductSizeEnum.PP, disabled: false},
    { value: ProductSizeEnum.P, disabled: false},
    { value: ProductSizeEnum.M, disabled: false},
    { value: ProductSizeEnum.G, disabled: false},
    { value: ProductSizeEnum.GG, disabled: false},
  ]

  typeShirt = ProductType.SHIRT;
  
  constructor(private readonly fb: FormBuilder)
  {
    this.form = fb.group({
      name: ['', [Validators.minLength(5), Validators.maxLength(100), Validators.required]],
      type: [null, [Validators.required]],
      quantity: [0, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  addSizeControl() {
    this.form.addControl('size', this.fb.control([null, [Validators.required]]));
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

  save() {
    console.log('form: ', this.form.value);
    this.form.reset();
  }
}
