import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

import { take } from 'rxjs';

import { AuthenticationService } from '../../../shared/services/auth/authentication.service';
import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { FileEventEnum, UploadFile } from '../../../shared/components/upload-file/upload-file';
import { FileEvent } from '../../../shared/components/upload-file/file-event';
import { HighlightsService } from '../highlights.service';
import { LoadingBlock } from '../../../shared/components/loading-block/loading-block';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { ProductImageModel } from '../../../shared/models/product/image-file/product-image-model';

@Component({
  selector: 'app-create-highlight',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    LoadingBlock,
    ErrorReaderPipe,
    ContentPanel,
    MessageModule,
    UploadFile
  ],
  templateUrl: './create-highlight.html',
  styleUrl: './create-highlight.scss'
})
export class CreateHighlight implements OnInit {

  form: FormGroup;

  maxFileSize = 2097152; // 2MB

  img: ProductImageModel[] = [];
  imgPristineAttr = true;

  @ViewChild('uploadFile')
  uploadFileComponent!: UploadFile;

  id: any;
  imgTemp: ProductImageModel = new ProductImageModel();

  loading = false;

  constructor(
    private fb: FormBuilder,
    private messageService: NotificationService,
    private highlightService: HighlightsService,
    private authService: AuthenticationService,
    private readonly location: Location,
    private readonly route: ActivatedRoute) {
    this.form = fb.group({
      img: ['', [Validators.required]],
      link: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
    });
  }

  ngOnInit(): void {
    this.loadCreatOrEditRoute();
  }

  private loadCreatOrEditRoute() {
    if (this.route.snapshot.url.toString().endsWith('edit')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.loading = true;
      this.highlightService.getById(this.id).subscribe({
        next: (highlightResponse) => {
          this.form.patchValue(highlightResponse);
        },
        error: (error) => {
          this.messageService.error(error.title, error.description);
        }
      });

      this.highlightService.getImageById(this.id).subscribe({
        next: (image) => {

          const f: File = new File([image], 'imagem.jpg', { type: image.type });
          Object.defineProperty(f, 'objectURL', {
            value: URL.createObjectURL(image)
          });

          this.imgTemp.indexImage = 0,
          this.imgTemp.file = f;
          this.imgTemp.isHighlight = false;

          this.img.push(this.imgTemp);
          this.uploadFileComponent.setImage(this.imgTemp.file);

          (this.form.get('img') as FormControl).setValue(this.img);
          this.loading = false;
        },
        error: (error) => {
          this.messageService.error(error.title, error.description);
          this.loading = false;
        }
      });
    }
  }

  onChangeImages(event: FileEvent) {
    if (event.eventType === FileEventEnum.ADDED) {
      event.index?.forEach(i => {
        this.addImage(this.img);
      });

    } else if (event.eventType === FileEventEnum.UPDATE) {
      if (event.index)
        (this.form.get('img') as FormControl).setValue(this.img);
    } else if (event.eventType === FileEventEnum.REMOVED) {
      (this.form.get('img') as FormControl).setValue(undefined);
    } else if (event.eventType === FileEventEnum.REMOVED_ALL) {
      (this.form.get('img') as FormControl).setValue(undefined);
    }
  }

  fileUploadErrorEvent(failFile: any) {
    this.messageService.error('Tamanho Inválido', `Imagem [${failFile.name}] excede o tamnho máximo de ${this.byteToKB(this.maxFileSize)}KB.`);
  }

  addImage(file: any) {
    (this.form.controls['img'] as FormControl).setValue(file);
    this.imgPristineAttr = false;
  }

  private byteToKB(byteValue: number) {
    return (byteValue / 1024.0).toFixed(2);
  }

  back() {
    this.location.back();
  }

  save() {
    const formData = new FormData();
    formData.append('link', this.form.get('link')?.value);
    formData.append('img', this.img[0].file);

    if (!this.id)
      this.create(formData);
    else
      this.update(formData);

  }

  create(formData: any) {
    this.highlightService.createWithFormData(formData).pipe(take(1)).subscribe({
      next: (response) => {
        this.messageService.success('Criado Com Sucesso', `Highlight criado com sucesso.`);
        this.uploadFileComponent.clearList();
        this.imgPristineAttr = true;
        this.form.reset();
      },
      error: (error) => {
        this.messageService.error(error.title, error.description);
      }
    });
  }

  update(formData: any) {
    this.highlightService.updateWithFormData(this.id, formData).pipe(take(1)).subscribe({
      next: (response) => {
        this.messageService.success('Atualizado Com Sucesso', `Highlight atualizado com sucesso.`);
        this.uploadFileComponent.clearList();
        this.imgPristineAttr = true;
        this.form.reset();
        this.location.back();
      },
      error: (error) => {
        this.messageService.error(error.title, error.description);
      }
    });
  }
}
