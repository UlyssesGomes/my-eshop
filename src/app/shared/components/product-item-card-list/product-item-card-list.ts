import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, tap } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';

import { environment } from '../../../../environments/environment';
import { ErrorHandler } from '../../services/error-handler';
import { Product } from '../../models/product/product';
import { UTableActionEnum } from '../u-table/u-table-action-enum';

@Component({
  selector: 'app-product-item-card-list',
  imports: [CommonModule, FormsModule, RatingModule, ButtonModule, DialogModule, ProgressSpinnerModule],
  templateUrl: './product-item-card-list.html',
  styleUrl: './product-item-card-list.scss'
})
export class ProductItemCardList extends ErrorHandler implements OnInit {
  protected urlBase = environment.apiUrl;
  
  @Input()
  item?: Product;

  @Input()
  isShowEdit = false;

  @Input()
  isShowDelete = false;

  @Input()
  endpoint = '';

  @Output()
  actionButton = new EventEmitter<any>();

  loading = false;
  img: any;

  visible = false;

  constructor(protected readonly http: HttpClient) { super(); }

  ngOnInit(): void {
    this.getById().subscribe({
      next: image => {
        this.img = URL.createObjectURL(image);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  delete() {
    this.actionButton.emit({
      action: UTableActionEnum.DELETE,
      item: this.item
    });
  }

  edit() {
    this.actionButton.emit({
      action: UTableActionEnum.EDIT,
      item: this.item
    });
  }

  imageZoom() {
    this.visible = true;
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
          console.info(`${url}${this.endpoint} GET response by ID: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }
}
