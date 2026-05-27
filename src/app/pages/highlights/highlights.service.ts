import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { catchError, Observable, retry, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Highlight } from '../../shared/models/highlight/highlight';
import { ServiceCore } from '../../shared/services/service-core';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService extends ServiceCore<Highlight> {

  protected override getEndpoint(): string {
    return 'highlights';
  }

  createWithFormData(formData: FormData): Observable<any> {
    const url = this.urlBase + this.getEndpoint() + '/highlight-image';
    const headers = new HttpHeaders();

    if (environment.enableDebug) {
      console.info(`POST ${this.getEndpoint()}: `, url, formData);
    }

    return this.http.post<FormData>(url, formData, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} POST response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }
}
