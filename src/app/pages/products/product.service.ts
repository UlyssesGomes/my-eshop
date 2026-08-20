import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { catchError, Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/product/product';
import { ServiceCore } from '../../shared/services/service-core';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ServiceCore<Product> {
  protected override getEndpoint(): string {
    return 'products';
  }

  createWithFormData(product: Product, images: any[]): Observable<any> {

    const formData = new FormData();
    formData.append('modelDTO', new Blob([JSON.stringify(product)], { type: 'application/json' }));

    images.forEach(image => {
      formData.append('images', image.file);
    });

    const url = this.urlBase + this.getEndpoint() + '/with-image';
    const headers = new HttpHeaders();

    if (environment.enableDebug) {
      console.info(`POST ${this.getEndpoint()}/with-image: `, url, formData);
    }

    return this.http.post<FormData>(url, formData, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/with-image POST response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  updateWithFormData(product: Product, images: any[], id: number): Observable<any> {

    const formData = new FormData();
    formData.append('modelDTO', new Blob([JSON.stringify(product)], { type: 'application/json' }));

    images.forEach(image => {
      formData.append('images', image.file);
    });

    const url = this.urlBase + this.getEndpoint() + '/with-image/' + id;
    const headers = new HttpHeaders();

    if (environment.enableDebug) {
      console.info(`PATCH ${this.getEndpoint()}/with-image: `, url, formData);
    }

    return this.http.patch<FormData>(url, formData, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/with-image PATCH response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }
}
