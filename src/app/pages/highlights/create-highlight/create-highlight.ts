import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { take } from 'rxjs';

import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { FileEventEnum, UploadFile } from '../../../shared/components/upload-file/upload-file';
import { FileEvent } from '../../../shared/components/upload-file/file-event';
import { ProductImageModel } from '../../../shared/models/product/image-file/product-image-model';
import { HighlightsService } from '../highlights.service';
import { AuthenticationService } from '../../../shared/services/auth/authentication.service';

@Component({
  selector: 'app-create-highlight',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    ErrorReaderPipe,
    ContentPanel,
    UploadFile
  ],
  templateUrl: './create-highlight.html',
  styleUrl: './create-highlight.scss'
})
export class CreateHighlight {

  form: FormGroup;

  maxFileSize = 1500000; // 1500kb

  img: ProductImageModel [] = [];
  imgPristineAttr = true;

  @ViewChild('uploadFile')
  uploadFileComponent!: UploadFile;

  constructor(private fb: FormBuilder, private messageService: MessageService, private highlighService: HighlightsService, private authService: AuthenticationService) {
    this.form = fb.group({
      img: ['', [Validators.required]],
      link: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
    });
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
    this.messageService.add({ severity: 'error', summary: 'Tamanho Inválido', life: 6000, detail: `Imagem [${failFile.name}] excede o tamnho máximo de ${this.byteToKB(this.maxFileSize)}KB.` });
  }

  addImage(file: any) {
    (this.form.controls['img'] as FormControl).setValue(file);
    this.imgPristineAttr = false;
  }

  private byteToKB(byteValue: number) {
    return (byteValue / 1024.0).toFixed(2);
  }

  save() {
    const formData = new FormData();
    formData.append('link', this.form.get('link')?.value);
    formData.append('img', this.img[0].file);
    this.highlighService.createWithFormData(formData).pipe(take(1)).subscribe( {
      next: (response) => {
        this.messageService.add(
          { severity: 'success', summary: 'Criado Com Sucesso', detail: `Highlight criado com sucesso.`, life: 5000 }
        );
        this.uploadFileComponent.clearList();
        this.imgPristineAttr = true;
        this.form.reset();
      },
      error: (e) => {
        this.messageService.add(
          { severity: 'error', summary: e.title, detail: e.description, life: 5000 }
        );
      }
    }
    );
  }
}
