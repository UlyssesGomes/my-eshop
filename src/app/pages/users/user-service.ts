import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ServiceCore } from '../../shared/services/service-core';
import { User } from '../../shared/models/user/user';
import { catchError, retry, tap } from 'rxjs';

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
}
