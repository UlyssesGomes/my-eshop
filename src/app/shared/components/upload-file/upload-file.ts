import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { FileUploadModule } from 'primeng/fileupload';

import { EllipisTooltip } from '../../directives/ellipis-tooltip';
import { FileEvent } from './file-event';
import { ProductImageModel } from '../../models/product/image-file/product-image-model';

export enum FileEventEnum {
  ADDED = 1,
  REMOVED = 2,
  REMOVED_ALL = 3,
  UPDATE = 4
}

@Component({
  selector: 'app-upload-file',
  imports: [CommonModule, ButtonModule, FileUploadModule, EllipisTooltip],
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.scss'
})
export class UploadFile {

  @Input()
  files: ProductImageModel[] = [];

  @Input()
  isMultiple = false;

  @Input()
  maxFileSize = 1000000;

  @Output()
  errorEvent = new EventEmitter<any>();

  @Output()
  filesChange = new EventEmitter<any>();

  @Output()
  onChangeFilesSelected = new EventEmitter<FileEvent>();

  @ViewChild('fileUpload')
  fileUpload: any;

  private previousSize = 0;

  constructor(private config: PrimeNG) { }

  get customFiles(): any {
    return this.files;
  }

  choose(event: any, callback: any) {
    callback();
  }

  clearAll(clearCallback: any) {
    clearCallback();
    this.clearFileList();
    this.onChangeFilesSelected.emit({ eventType: FileEventEnum.REMOVED_ALL });
    this.previousSize = 0;
  }

  clearList() {
    this.fileUpload.clear();
    this.clearFileList();
    this.previousSize = 0;
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: number) {
    // This callback call onRemoveFile()
    removeFileCallback(index);
    let currentIndex = 0;
    this.files.forEach(f => f.indexImage = currentIndex++);  
    this.previousSize--;
  }

  onRemoveFile(event: any) {
    this.files = this.files.filter((f: any) => f.indexImage !== event.originalEvent);
    this.filesChange.emit(this.files);
    this.onChangeFilesSelected.emit({ eventType: FileEventEnum.REMOVED, index: [event.originalEvent] });
  }

  onSelectedFiles(event: any) {
    let count = this.files.length;
    const newFilesIndex = this.validateFiles(event);
    const fileListArray = [...event.files];
    const incomingFiles = fileListArray.map((f: any) => {
      return {
        indexImage: count++,
        file: f,
        isHighlight: false
      }
    });

    this.files.push(...incomingFiles);
    this.filesChange.emit(this.files);
    this.onChangeFilesSelected.emit({ eventType: FileEventEnum.ADDED, index: newFilesIndex });
  }

  private validateFiles(event: any) {
    let hasNewFiles = false;
    if(this.previousSize < event.currentFiles.length) {
      hasNewFiles = true;
      this.previousSize = event.currentFiles.length;
    }
    const uploadedFiles = event.files;
    const newFilesIndex = [];
    let count = this.files.length;
    for (let file of uploadedFiles) {
      if (file.size > this.maxFileSize) {
        this.errorEvent.emit(file);
      } else if (hasNewFiles) {
        newFilesIndex.push(count++);
      }
    }
    return newFilesIndex;
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes![0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes![i]}`;
  }

  changeHighlightStatus(index: number) {
    this.files[index].isHighlight =  !this.files[index].isHighlight;
    this.onChangeFilesSelected.emit({ eventType: FileEventEnum.UPDATE, index: [index] });
  }

  setImage(image: ProductImageModel) {
    this.fileUpload.files.push(image);
    this.fileUpload.cd.markForCheck();
  }

  private clearFileList() {
    this.files = [];
    this.filesChange.emit(this.files);
  }
}
