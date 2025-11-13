import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { User } from '../../shared/models/user/user';
import { UTable } from '../../shared/components/u-table/u-table';
import { UserType } from '../../shared/enums/user-type';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ContentPanel, FormsModule, ButtonModule, PaginatorModule, SelectModule, UTable],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  users: User[] = [];
  paginatedUsers: User[] = [];

  columnsWidth: number[] = [5, 25, 15, 10, 25, 15];
  paginationOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
  ];
  first: number = 0;
  rows: number = 10;

  constructor(private readonly router: Router, 
    private readonly route: ActivatedRoute
  ) {
    this.loadMaterials();
    this.paginatedUsers = this.users.slice(this.first, this.first + this.rows);
  }

  onRowEditInit(user: User) {
    //this.clonedMaterials[material.id as number] = { ...material };
  }

  onRowEditSave(user: User) {
    // if (material.quantity && material.quantity > 0) {
    //   delete this.clonedMaterials[material.id as number];
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    // } else {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    // }
  }

  onRowEditCancel(user: User, index: number) {
    // this.materials[index] = this.clonedMaterials[material.id as number];
    // delete this.clonedMaterials[material.id as number];
  }

  onPageChange(event: PaginatorState) {
    console.log('event: ', event);
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.paginatedUsers = this.users.slice(this.first, this.first + this.rows);
  }

  onPageFrameSize() {
    this.paginatedUsers = this.users.slice(this.first, this.first + this.rows);
  }

  columnActionEvent(event: any) {
    window.alert(`Execute action ${event.action} in ${event.item.id}.`);
  }

  goToNewUser() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  private loadMaterials() {
    this.users.push({
      id: 0,
      fullName: 'Ulysses de Medeiros Gomes Blabla Tututu',
      cpf: '000.000.000-00',
      birth: new Date(),
      email: `user-email@email.com`,
      type: UserType.OWNER
    });
    for (let u = 1; u < 20; u++) {
      this.users.push({
        id: u,
        fullName: `Nome completo do usuário ${u}`,
        cpf: `000.000.000-0${u}`,
        birth: new Date(),
        email: `user-email${u}@email.com`,
        type: UserType.CUSTOMER
      });
    }

  }
}
