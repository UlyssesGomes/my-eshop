import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ShowDatePipe } from '../../pipes/show-date/show-date-pipe';
import { TableModule } from 'primeng/table';
import { UTableColumnAction } from './u-table-column-action';
import { UTableActionEnum } from './u-table-action-enum';

@Component({
  selector: 'app-u-table',
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, ShowDatePipe, TableModule],
  templateUrl: './u-table.html',
  styleUrl: './u-table.scss'
})
export class UTable implements OnInit, OnChanges {

  @Input()
  items: any[] = [];

  @Input()
  size: 'small' | 'large' | undefined = "small";

  @Input()
  scrollable = true;

  @Input()
  scrollHeight = '580px';

  @Input()
  columnsWidth: number[] = [];

  columns: any[] = [];
  clonedMaterials: { [s: string]: any } = {};

  columnActionEnum = UTableActionEnum;

  @Input()
  isShowTimeInDateColumn = false;

  @Input()
  showActionColumn = false;

  @Output()
  columnAction = new EventEmitter<UTableColumnAction>();

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.columns.length == 0) {
      if (this.items[0]) {
        for (let u in this.items[0]) {
          this.columns.push(u);
        }
      }
    }
  }

  onColumnAction(actionEvent: UTableActionEnum, itemEvent: any) {
    this.columnAction.emit({
      action: actionEvent,
      item: itemEvent
    });
  }

  onRowEditInit(item: any) {
    this.clonedMaterials[item.id as number] = { ...item };
  }

  onRowEditSave(item: any) {
    if (item.quantity && item.quantity > 0) {
      delete this.clonedMaterials[item.id as number];
      //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(item: any, index: number) {
    this.items[index] = this.clonedMaterials[item.id as number];
    //delete this.clonedMaterials[material.id as number];
  }

}
