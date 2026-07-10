import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { Material } from '../../shared/models/material/material';
import { MaterialService } from './material.service';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { ProductType } from '../../shared/enums/product-type';
import { UTable } from '../../shared/components/u-table/u-table';
import { UTableActionEnum } from '../../shared/components/u-table/u-table-action-enum';

@Component({
  selector: 'app-materials',
  imports: [CommonModule, FormsModule, ButtonModule, ConfirmDialogModule, ContentPanel, PaginatorModule, SelectModule, UTable],
  templateUrl: './materials.html',
  styleUrl: './materials.scss'
})
export class Materials implements OnInit {

  paginatedMaterials: Material[] = [];
  columnsWidth: number[] = [10, 35, 15, 15, 15, 10];

  types = [
    { label: 'Camisas', value: ProductType.SHIRT },
    { label: 'Canecas', value: ProductType.MUG },
    { label: 'Filamento 3D', value: ProductType.FILAMENT }
  ];
  coresMock = ['branco', 'preto', 'azul', 'vermelho', 'rosa', 'bege', 'rosa', 'verde', 'amarelo', 'cinza',
    'violeta', 'escarlate', 'cyano', 'limão', 'rosa', 'bege', 'rosa', 'verde', 'amarelo', 'cinza'
  ];

  paginationOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
  ];

  first = 0
  pageSize = 10;
  totalElements = 0;

  constructor(private messageService: NotificationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private materialService: MaterialService,
    private notification: NotificationService,
    private readonly confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.loadMaterials();
  }

  onRowEditInit(material: Material) {
    //this.clonedMaterials[material.id as number] = { ...material };
  }

  onRowEditSave(material: Material) {
    // if (material.quantity && material.quantity > 0) {
    //   delete this.clonedMaterials[material.id as number];
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    // } else {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    // }
  }

  onRowEditCancel(material: Material, index: number) {
    // this.materials[index] = this.clonedMaterials[material.id as number];
    // delete this.clonedMaterials[material.id as number];
  }

  onPageChange(event: PaginatorState) {
    console.log('event: ', event);
    this.first = event.first ?? 0;
    this.pageSize = event.rows ?? 10;
    this.loadMaterials();
  }

  onPageFrameSize() {
    //this.paginatedMaterials = this.materials.slice(this.first, this.first + this.rows);
  }

  goToNewMaterial() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  columnActionEvent(event: any) {
    if (event.action === UTableActionEnum.EDIT) {
      this.router.navigate([event.item.id, 'edit'], { relativeTo: this.route });
    } else if (event.action === UTableActionEnum.DELETE) {

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Você tem certeza que deseja deletar esse item?',
        header: 'Atenção!',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
        },
        acceptButtonProps: {
          label: 'Delete',
          severity: 'danger'
        },

        accept: () => {
          this.materialService.deleteById(event.item.id).subscribe({
            next: () => {
              this.messageService.success('Deletado', `Item com id ${event.item.id} foi deletado.`);
              this.loadMaterials();
            },
            error: error => {
              this.messageService.success(error.title, error.description);
            }
          });
        },
        reject: () => {
          this.messageService.warning('Cancelado', 'Operação de remoção cancelada.');
        }
      });
    }
  }

  private loadMaterials() {
    this.materialService.listWithPagination(this.first, this.pageSize).subscribe({
      next: response => {
        this.paginatedMaterials = response.content;
        this.totalElements = response.page.totalElements;
      },
      error: error => this.notification.error(error.title, error.description)
    });
  }
}
