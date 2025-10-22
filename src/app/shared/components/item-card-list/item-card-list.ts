import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';

import { Product } from '../../models/product/product';

@Component({
  selector: 'app-item-card-list',
  imports: [CommonModule, FormsModule, RatingModule, ButtonModule],
  templateUrl: './item-card-list.html',
  styleUrl: './item-card-list.scss'
})
export class ItemCardList {
  @Input()
  item?: Product;

  @Output() 
  favoriteButton = new EventEmitter<any>();

  favoriteClick() {
    this.favoriteButton.emit();
  }
}
