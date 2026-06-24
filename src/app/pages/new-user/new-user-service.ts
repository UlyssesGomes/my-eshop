import { Injectable } from '@angular/core';

import { catchError, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NewUser } from '../../shared/models/user/new-user';
import { ServiceCore } from '../../shared/services/service-core';

@Injectable({
  providedIn: 'root'
})
export class NewUserService extends ServiceCore<NewUser> {

  protected override getEndpoint(): string {
    return 'new-user';
  }

  emailValidation(code: string) {
    const url = `${this.urlBase}${this.getEndpoint()}/email-validate?code=${code}`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`GET ${this.getEndpoint()}: `, url);
    }

    return this.http.get(url, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} GET response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }
}
