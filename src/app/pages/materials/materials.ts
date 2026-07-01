import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { Material } from '../../shared/models/material/material';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { ProductType } from '../../shared/enums/product-type';
import { UTable } from '../../shared/components/u-table/u-table';

@Component({
  selector: 'app-materials',
  imports: [CommonModule, FormsModule, ButtonModule, ContentPanel, PaginatorModule, SelectModule, UTable],
  templateUrl: './materials.html',
  styleUrl: './materials.scss'
})
export class Materials {

  materials: Material[] = [];
  paginatedMaterials: Material[] = [];
  columnsWidth: number[] = [10, 36, 22, 22, 10];

  types = [
    { label: 'Camisas', value: ProductType.SHIRT },
    { label: 'Canecas', value: ProductType.MUG },
    { label: 'Impressão 3D', value: ProductType.PRINT_3D }
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
  first: number = 0;
  rows: number = 10;


  constructor(private messageService: NotificationService,
    private readonly router: Router, 
    private readonly route: ActivatedRoute
  ) {
    this.loadMaterials();
    this.paginatedMaterials = this.materials.slice(this.first, this.first + this.rows);
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
    this.rows = event.rows ?? 10;

    this.paginatedMaterials = this.materials.slice(this.first, this.first + this.rows);
  }

  onPageFrameSize() {
    this.paginatedMaterials = this.materials.slice(this.first, this.first + this.rows);
  }

  goToNewMaterial() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  columnActionEvent(event: any) {
    
  }

  private loadMaterials() {
    for (let u = 0; u < 20; u++) {
      this.materials.push({
        id: u,
        name: this.coresMock[u],
        type: ProductType.SHIRT,
        quantity: Math.round(Math.random() * 100),
      })
    }
  }
}
