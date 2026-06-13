import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { HighlightsService } from './highlights.service';
import { ItemList } from '../../shared/models/item-list/item-list';
import { LoadingBlock } from '../../shared/components/loading-block/loading-block';
import { SimpleItemCardList } from '../../shared/components/simple-item-card-list/simple-item-card-list';

@Component({
  selector: 'app-highlights',
  imports: [CommonModule, ButtonModule, ContentPanel, LoadingBlock, MessageModule, RouterLink, SimpleItemCardList],
  templateUrl: './highlights.html',
  styleUrl: './highlights.scss'
})
export class Highlights {

  highlightList: ItemList[] = [];

  page = 0
  pageSize = 10;

  isLoading = false;

  constructor(private readonly highlightService: HighlightsService, private readonly messageService: MessageService, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    this.reloadItems();
  }

  editSelectedHightlight(id: any) {
    this.router.navigate([id, 'edit'], {
      relativeTo: this.activatedRoute
    });
  }

  deleteSelectedHighlight(id: any) {
    this.highlightService.deleteById(id).subscribe(() => {
      this.messageService.add(
        { severity: 'success', summary: 'Deletado', detail: `Item ${id} deletado com sucesso.`, life: 5000 }
      );
      this.reloadItems();
    });
  }

  reloadItems() {
    this.isLoading = true;
    this.highlightService.listWithPagination(this.page, this.pageSize).subscribe((response) => {
      let highlights = response.content;

      this.highlightList = highlights.map((h: any) => {
        const i = new ItemList();
        i.id = h.id;
        i.title = h.link;
        i.img = `data:image/png;base64,${h.img}`;

        return i;
      });
      this.isLoading = false;
    });
  }

}
