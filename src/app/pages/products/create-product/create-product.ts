import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { take } from 'rxjs';

import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { CoreCreateEdit } from '../../../shared/core/core-create-edit';
import { FileEventEnum, UploadFile } from '../../../shared/components/upload-file/upload-file';
import { FileEvent } from '../../../shared/components/upload-file/file-event';
import { MultifieldPanel } from '../../../shared/components/multifield-panel/multifield-panel';
import { ProductImageModel } from '../../../shared/models/product/image-file/product-image-model';
import { ProductType } from '../../../shared/enums/product-type';
import { Product } from '../../../shared/models/product/product';
import { ProductService } from '../product.service';
import { ProductImageService } from '../product-image.service';
import { ServiceCore } from '../../../shared/services/service-core';

@Component({
  selector: 'app-create-product',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    MultifieldPanel,
    ErrorReaderPipe,
    TextareaModule,
    InputNumberModule,
    ContentPanel,
    SelectModule,
    MultiSelectModule,
    MessageModule,
    UploadFile
  ],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss'
})
export class CreateProduct extends CoreCreateEdit<Product> {

  previousProductTypeValue = '';
  files: ProductImageModel[] = [];
  maxFileSize = 2097152; // 2MB
  imgPristineAttr = true;

  imagesSelectOptions: any = [];
  productsMaterialOptions: any = [];

  options!: FormArray;

  @ViewChild('uploadFile')
  uploadFileComponent!: UploadFile;

  productTypes = [
    { type: 'Camisa', value: ProductType.SHIRT, disabled: false },
    { type: 'Caneca', value: ProductType.MUG, disabled: false },
    { type: 'Impressão 3D', value: ProductType.FILAMENT, disabled: true }
  ];

  constructor(private service: ProductService, private productImageService: ProductImageService) {
    super();
    this.options = this.fb.array([]);
  }

  override loadData() {
    super.loadData();

    this.productImageService.getByProductId(this.id).subscribe({
      next: (images: any[]) => {
        let index = 0;
        images.forEach((image: any) => {
          const imageType = image.contentType.split('/')[1];          

          const byteString = atob(image.img);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uint8Array = new Uint8Array(arrayBuffer);

          for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: 'image/png' });
          const f: File = new File([blob], `image.${imageType}`, { type: image.contentType });
          Object.defineProperty(f, 'objectURL', {
            value: URL.createObjectURL(blob)
          });
          const imgTemp: ProductImageModel = new ProductImageModel();
          imgTemp.indexImage = index++;
          imgTemp.file = f;
          imgTemp.isHighlight = image.highlight;

          this.files.push(imgTemp);
          this.uploadFileComponent.setImage(imgTemp.file);
          this.files.forEach(file => {
            this.addImage(file);
          });
        });

        this.loading = false;
      },
      error: (error) => {
        this.messageService.error(error.title, error.description);
        this.loading = false;
      }
    });
  }

  onChangeImages(event: FileEvent) {
    if (event.eventType === FileEventEnum.ADDED) {
      event.index?.forEach(i => {
        this.addImage(this.files[i]);
      });

    } else if (event.eventType === FileEventEnum.UPDATE) {
      if (event.index)
        (this.form.get('images') as FormArray).at(event.index[0])?.setValue(this.files[event.index[0]]);
    } else if (event.eventType === FileEventEnum.REMOVED) {
      if (event.index)
        this.removeImage(event.index[0]);

      let isRemoved = false;
      let removeIndex = -1;
      let countIndex = 0;
      for (let option of this.options.controls) {
        if (event.index !== undefined && option.value.indexImage >= event.index[0] && !isRemoved) {
          isRemoved = true;

          if (option.value.indexImage > event.index[0]) {
            option.get('indexImage')?.setValue(option.value.indexImage - 1);
          } else if (option.value.indexImage == event.index[0]) {
            removeIndex = countIndex;
          }
        } else if (isRemoved) {
          option.get('indexImage')?.setValue(option.value.indexImage - 1);
        }
        countIndex++;
      }

      if (removeIndex >= 0) {
        this.options.at(removeIndex).reset();
        this.options.removeAt(removeIndex);
      }
    } else if (event.eventType === FileEventEnum.REMOVED_ALL) {
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
    this.imgPristineAttr = false;
  }

  removeImage(arrayIndex: number) {
    (this.form.controls['images'] as FormArray).removeAt(arrayIndex);
    const filtred = this.files.filter((_, index) => index !== arrayIndex);
    this.loadFilesToSelectOption();
  }

  productChange() {

  }

  createProductOption() {
    const type = this.form.get('type')?.value;

    if (type === '' || type === undefined || type === null) {
      this.messageService.warning('Tipo Não Informado', `Informe o tipo do produto antes de adicionar opções!`);
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

    if (this.files.length > 0) {
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

  removeProductOption(index: number) {
    (this.form.get('options') as FormArray).removeAt(index);
  }

  fileUploadErrorEvent(failFile: any) {
    this.messageService.error('Tamanho Inválido', `Imagem [${failFile.name}] excede o tamnho máximo de ${this.byteToKB(this.maxFileSize)}KB.`);
  }

  private byteToKB(byteValue: number) {
    return (byteValue / 1024.0).toFixed(2);
  }

  override create(formData: any) {
    this.service.createWithFormData(this.form.value, this.files).pipe(take(1)).subscribe({
      next: (response) => {
        this.messageService.success('Criado Com Sucesso', `${this.featureName()} criado com sucesso.`);
        this.afterCreate();
        this.form.reset();
      },
      error: (error) => {
        this.messageService.error(error.title, error.description);
      }
    });
  }

  override afterCreate() {
    this.clearImageField();
  }

  override update(formData: any) {
    this.service.updateWithFormData(this.form.value, this.files, this.id).pipe(take(1)).subscribe({
      next: (response) => {
        this.messageService.success('Atualizado Com Sucesso', `${this.featureName()} atualizado com sucesso.`);
        this.afterCreate();
        this.form.reset();
      },
      error: (error) => {
        this.messageService.error(error.title, error.description);
      }
    });
  }

  override afterUpdate() {
    this.clearImageField();
  }

  private clearImageField() {
    this.uploadFileComponent.clearList();
    if (this.form.get('images'))
      (this.form.get('images') as FormArray).clear();

    this.files = [];
    this.imgPristineAttr = true;
  }

  override getService(): ServiceCore<Product> {
    return this.service;
  }

  override defineForm(): FormGroup {
    return this.fb.group({
      images: this.fb.array([]),
      type: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      price: [0.0, [Validators.required, Validators.min(1)]],
    });
  }

  override featureName(): string {
    return 'Products';
  }
}
