import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, retry, tap } from 'rxjs';

import { ErrorHandler } from '../error-handler';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ErrorHandler {

  private endpoint = 'authenticate'
  private urlPath = environment.apiUrl + this.endpoint;

  constructor(protected readonly http: HttpClient) {
    super();
    if (environment.enableDebug) {
      console.info('Backend API URL:', this.urlPath);
    }
  }

  login(email: string, password: string) {
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`POST ${this.endpoint}: `, this.urlPath, {email: email, password: password});
    }

    return this.http.post<any>(this.urlPath, {email: email, password: password}, { headers, withCredentials: true }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.endpoint} POST response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  refresh() {
    if (environment.enableDebug) {
      console.info(`GET ${this.endpoint}/refresh`);
    }

    return this.http.get<any>(`${this.urlPath}/refresh`,{ withCredentials: true }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.endpoint}/refresh GET response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  protected getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return headers;
  }

}
