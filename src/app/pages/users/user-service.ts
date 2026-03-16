import { Injectable } from '@angular/core';

import { ServiceCore } from '../../shared/services/service-core';
import { User } from '../../shared/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceCore<User> {
  
  protected override getEndpoint(): string {
    return 'users';
  }
}
