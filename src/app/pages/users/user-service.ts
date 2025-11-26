import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ServiceCore } from '../../shared/services/service-core';
import { User } from '../../shared/models/user/user';
import { catchError, retry, tap } from 'rxjs';
import { LoginRequest } from '../../shared/models/user/login-request';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceCore<User> {
  protected override getEndpoint(): string {
    return 'users';
  }

  createNewCustomer(model: User) {
    const url = this.urlBase + this.getEndpoint() + '/new-customer';
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`POST ${this.getEndpoint()}: `, url, model);
    }

    return this.http.post<User>(url, model, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} POST response: `, response);
        }
      }),
      retry(1),
      catchError(this.handleError)
    );
  }

  login(login: LoginRequest) {
    const url = this.urlBase + this.getEndpoint() + '/login';
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`POST ${this.getEndpoint()}: `, url, login.email);
    }

    return this.http.post<User>(url, login, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} POST response: `, response);
        }
      }),
      retry(1),
      catchError(this.handleError)
    );
  }
}
