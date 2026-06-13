import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MessageService } from 'primeng/api';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { Product } from '../../shared/models/product/product';
import { ShopItemCardList } from '../../shared/components/shop-item-card-list/shop-item-card-list';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ButtonModule, MenuModule, ShopItemCardList, ContentPanel],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  productList: Product[] = [
    {
      id: 0,
      image: 'image 1',
      name: 'Camisa Fullmetal Alchemist - adicionando nome extremamente longo!!!',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 5,
      price: 59.50
    },
    {
      id: 1,
      image: 'image 2',
      name: 'Camisa Dragon Ball Z',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 4.5,
      price: 59.50
    },
    {
      id: 2,
      image: 'image ',
      name: 'Camisa Zelda',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 5,
      price: 59.50
    },
    {
      id: 3,
      image: 'image ',
      name: 'Camisa de Link',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 5,
      price: 59.50
    },
    {
      id: 4,
      image: 'image ',
      name: 'Sonic',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 4,
      price: 59.50
    },
    {
      id: 5,
      image: 'image ',
      name: 'Foto Pessoal',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 4,
      price: 79.50
    },
    {
      id: 6,
      image: 'image ',
      name: 'Charizard',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 5,
      price: 59.50
    },
    {
      id: 7,
      image: 'image ',
      name: 'Mewtwo',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 2,
      price: 59.50
    },
    {
      id: 8,
      image: 'image ',
      name: 'Espada de Xenoblade',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 5,
      price: 59.50
    },
    {
      id: 9,
      image: 'image ',
      name: 'Batman',
      description: 'Camisa branca 60% poliester e 40% algodão.',
      rate: 4,
      price: 59.50
    }
  ];

  constructor(private messageService: MessageService) {}

  addFavoriteItem(item: Product) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Item ${item.name} adicionado com sucesso.` });
  }
}
