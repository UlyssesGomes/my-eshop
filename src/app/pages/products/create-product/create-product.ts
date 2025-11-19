import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { FileEventEnum, UploadFile } from '../../../shared/components/upload-file/upload-file';
import { FileEvent } from '../../../shared/components/upload-file/file-event';
import { MultifieldPanel } from '../../../shared/components/multifield-panel/multifield-panel';
import { ProductImageModel } from '../../../shared/models/product/image-file/product-image-model';
import { ProductType } from '../../../shared/enums/product-type';

@Component({
  selector: 'app-create-product',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    MultifieldPanel,
    ErrorReaderPipe,
    TextareaModule,
    InputNumberModule,
    ContentPanel,
    SelectModule,
    MultiSelectModule,
    UploadFile
  ],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss'
})
export class CreateProduct implements OnInit {

  form: FormGroup;
  previousProductTypeValue = '';
  files: ProductImageModel[] = [];
  maxFileSize = 100000;

  imagesSelectOptions: any = [];
  productsMaterialOptions: any = [];

  options!: FormArray;

  @ViewChild('uploadFile')
  uploadFileComponent!: UploadFile;

  productTypes = [
    { type: 'Camisa', value: ProductType.SHIRT, disabled: false },
    { type: 'Caneca', value: ProductType.MUG, disabled: false },
    { type: 'Impressão 3D', value: ProductType.PRINT_3D, disabled: true }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.form = fb.group({
      images: this.fb.array([]),
      type: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      price: [0.0, [Validators.required, Validators.min(1)]],
    });

    this.options = this.fb.array([]);
  }

  ngOnInit(): void {
    this.loadProdutcsMaterial();
  }

  onChangeImages(event: FileEvent) {
    if(event.eventType === FileEventEnum.ADDED) {
      event.index?.forEach( i => {
        this.addImage(this.files[i]);
      });

    } else if(event.eventType === FileEventEnum.UPDATE) {
      if(event.index) 
        (this.form.get('images') as FormArray).at(event.index[0])?.setValue(this.files[event.index[0]]);
    } else if(event.eventType === FileEventEnum.REMOVED) {
      if(event.index)
        this.removeImage(event.index[0]);

      let isRemoved = false;
      let removeIndex = -1;
      let countIndex = 0;
      for(let option of this.options.controls) {
        if(event.index !== undefined && option.value.indexImage >= event.index[0] && !isRemoved) {
          isRemoved = true;

          if(option.value.indexImage > event.index[0]) {
            option.get('indexImage')?.setValue(option.value.indexImage - 1);
          } else if(option.value.indexImage == event.index[0]) {
            removeIndex = countIndex;
          }
        } else if(isRemoved) {
          option.get('indexImage')?.setValue(option.value.indexImage - 1);
        }
        countIndex++;
      }

      if(removeIndex >= 0) {
        this.options.at(removeIndex).reset();
        this.options.removeAt(removeIndex);
      }
    } else if(event.eventType === FileEventEnum.REMOVED_ALL) {
      this.options.clear();
      (this.form.get('images') as FormArray).clear();
    }
    this.loadFilesToSelectOption();
  }

  createNewImageControl(file: ProductImageModel) {
    return this.fb.group({
      file: [file.file, Validators.required],
      isHighlight: [file.isHighlight, []],
      indexImage: [file.indexImage, Validators.required]
    });
  }

  addImage(file: ProductImageModel) {
    (this.form.controls['images'] as FormArray).push(this.createNewImageControl(file));
  }

  removeImage(index: number) {
    (this.form.controls['images'] as FormArray).removeAt(index);
    this.loadFilesToSelectOption();
  }

  productChange() {
    
  }

  createProductOption() {
    const type = this.form.get('type')?.value;

    if (type === '' || type === undefined  || type === null) {
      this.messageService.add({ severity: 'warn', summary: 'Tipo Não Informado', life: 4000, detail: `Informe o tipo do produto antes de adicionar opções!` });
      return;
    }

    if (!this.form.get('options')) {
      this.form.addControl('options', this.options);
    }

    if (type === ProductType.SHIRT) {
      this.options.push(this.fb.group({
        indexImage: [null, [Validators.required]],
        idMaterial: [null, [Validators.required]]
      }));
    }
    this.loadFilesToSelectOption();
  }

  private loadFilesToSelectOption() {
    let count = 0;

    if(this.files.length > 0) {
      this.imagesSelectOptions = this.files.map((file) => {
        return {
          name: file.file.name,
          index: count++
        }
      });
    } else {
      this.imagesSelectOptions = [];
    }
  }

  private loadProdutcsMaterial () {
    this.productsMaterialOptions = [
      {
        id: 2,
        name: 'branco',
        quantity: 34
      },
      {
        id: 1,
        name: 'preto',
        quantity: 122
      },
    ]
  }

  removeProductOption(index: number) {
    (this.form.get('options') as FormArray).removeAt(index);
  }

  fileUploadErrorEvent(failFile: any) {
    this.messageService.add({ severity: 'error', summary: 'Tamanho Inválido', life: 6000, detail: `Imagem [${failFile.name}] excede o tamnho máximo de ${this.byteToKB(this.maxFileSize)}KB.` });
  }

  private byteToKB(byteValue: number) {
    return (byteValue / 1024.0).toFixed(2);
  }

  save() {
    console.log('form: ', this.form.value);
    this.form.reset();
    this.form.removeControl('options');
    this.options.clear();
    (this.form.get('images') as FormArray).clear();
    this.uploadFileComponent.clearList();
  }

}
