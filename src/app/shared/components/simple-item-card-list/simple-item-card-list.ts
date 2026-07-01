import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { catchError, Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ErrorHandler } from '../../services/error-handler';
import { ItemList } from '../../models/item-list/item-list';

@Component({
  selector: 'app-simple-item-card-list',
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, ProgressSpinnerModule],
  templateUrl: './simple-item-card-list.html',
  styleUrl: './simple-item-card-list.scss'
})
export class SimpleItemCardList extends ErrorHandler implements OnInit {

  protected urlBase = environment.apiUrl;

  @Input()
  item!: ItemList;

  @Input()
  endpoint!: string;

  @Input()
  isShowEdit = false;

  @Input()
  isShowDelete = false;

  @Output()
  editButton = new EventEmitter<any>();

  @Output()
  deleteButton = new EventEmitter<any>();

  visible: boolean = false;

  loading = false;

  img: any;

  constructor(protected readonly http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.getById().subscribe({
      next: image => {
        this.img = URL.createObjectURL(image);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  imageZoom() {
    this.visible = true;
  }

  editClick(item: any) {
    this.editButton.emit(item);
  }

  deleteClick(item: any) {
    this.deleteButton.emit(item);
  }

  private getById(): Observable<any> {
    this.loading = true;
    const url = `${this.urlBase}${this.endpoint}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (environment.enableDebug) {
      console.info(`GET ${url}: `);
    }

    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${url} GET response by ID: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }
}
