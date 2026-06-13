import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { ItemList } from '../../models/item-list/item-list';

@Component({
  selector: 'app-simple-item-card-list',
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule],
  templateUrl: './simple-item-card-list.html',
  styleUrl: './simple-item-card-list.scss'
})
export class SimpleItemCardList implements OnInit {
  @Input()
  item!: ItemList;

  @Input()
  isShowEdit = false;

  @Input()
  isShowDelete = false;

  @Output() 
  editButton = new EventEmitter<any>();

  @Output() 
  deleteButton = new EventEmitter<any>();

  visible: boolean = false;

  ngOnInit(): void {

  }

  imageZoom() {
    this.visible = true;
  }

  editClick(item: any) {
    this.editButton.emit(item);
  }

  deleteClick(item: any) {
    this.deleteButton.emit(item);
  }
}
