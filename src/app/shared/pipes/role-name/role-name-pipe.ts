import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleName'
})
export class RoleNamePipe implements PipeTransform {

  roleNames : any = {
    'ROLE_OWNER': 'Dono',
    'ROLE_ADMIN': 'Admin',
    'ROLE_EMPLOYEE': 'Funcionário',
    'ROLE_CUSTOMER': 'Cliente'
  };

  transform(value: unknown, ...args: unknown[]): unknown {
    if(typeof value === 'string')
      return this.roleNames[value]

    return value;
  }

}
