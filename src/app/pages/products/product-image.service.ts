import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ErrorHandler } from '../../shared/services/error-handler';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService extends ErrorHandler {
  protected urlBase = environment.apiUrl;

  protected getEndpoint(): string {
    return 'product-images';
  }

  constructor(protected readonly http: HttpClient) {
    super();
    if (environment.enableDebug) {
      console.info('Backend API URL:', this.urlBase);
    }
  }

  getByProductId(id: number): Observable<any> {
    const url = `${this.urlBase}${this.getEndpoint()}/${id}`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`GET ${this.getEndpoint()}: `, url);
    }

    return this.http.get(url, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} GET response by ID: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  protected getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return headers;
  }
}
