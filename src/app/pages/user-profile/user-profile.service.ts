import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

import { ErrorHandler } from '../../shared/services/error-handler';
import { environment } from '../../../environments/environment';
import { UserPersonal } from '../../shared/models/user/user-personal';
import { UserAddress } from '../../shared/models/user/user-address';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends ErrorHandler {

  protected urlBase = environment.apiUrl;

  public static readonly USER_DATA = 'userData';
  public static readonly USER_ADDRESS = 'userAddress';

  private userSubscriber: any;

  public observable = new Observable(subscriber => {
    this.userSubscriber = subscriber;
  });

  constructor(protected readonly http: HttpClient) {
    super();
  }

  getUserPersonalValidations(): Observable<any> {
    const url = `${this.urlBase}${this.getEndpoint()}/personal-validations`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`GET ${this.getEndpoint()}: `, url);
    }

    return this.http.get<any>(url, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} GET response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  getUserPersonal(): Observable<UserPersonal> {
    const url = `${this.urlBase}${this.getEndpoint()}/user-personal`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`GET ${this.getEndpoint()}/user-personal: `, url);
    }

    return this.http.get<UserPersonal>(url, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/user-personal GET response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  patchUserPersonal(data: Partial<UserPersonal>): Observable<UserPersonal> {
    const url = `${this.urlBase}${this.getEndpoint()}/user-personal`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`PATCH ${this.getEndpoint()}/user-personal: `, url, data);
    }

    return this.http.patch<UserPersonal>(url, data, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/user-personal PATCH: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  getUserAddresses(): Observable<UserAddress[]> {
    const url = `${this.urlBase}${this.getEndpoint()}/user-address`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`GET ${this.getEndpoint()}/user-address: `, url);
    }

    return this.http.get<UserAddress[]>(url, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/user-address GET response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  patchUserAddress(data: Partial<UserAddress[]>): Observable<UserAddress[]> {
    const url = `${this.urlBase}${this.getEndpoint()}/user-address`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`PATCH ${this.getEndpoint()}/user-address: `, url, data);
    }

    return this.http.patch<UserAddress[]>(url, data, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/user-address PATCH: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  updatePassword(data: any): Observable<any> {
    const url = `${this.urlBase}${this.getEndpoint()}/change-password`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`PATCH ${this.getEndpoint()}/change-password: `, url, data);
    }

    return this.http.patch(url, data, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/change-password PATCH: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  updateEmail(data: any): Observable<any> {
    const url = `${this.urlBase}${this.getEndpoint()}/change-email`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`PATCH ${this.getEndpoint()}/change-email: `, url, data);
    }

    return this.http.patch(url, data, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/change-email PATCH: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  setValidData(value: boolean) {
    this.userSubscriber.next({ subject: UserProfileService.USER_DATA, value: value });
  }

  setValidAddress(value: boolean) {
    this.userSubscriber.next({ subject: UserProfileService.USER_ADDRESS, value: value });
  }

  protected getEndpoint(): string {
    return 'user-profile';
  }

  protected getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return headers;
  }
}
