import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { HighlightsService } from './highlights.service';
import { ItemList } from '../../shared/models/item-list/item-list';
import { LoadingBlock } from '../../shared/components/loading-block/loading-block';
import { SimpleItemCardList } from '../../shared/components/simple-item-card-list/simple-item-card-list';

@Component({
  selector: 'app-highlights',
  imports: [CommonModule, ButtonModule, ConfirmDialogModule, ContentPanel, LoadingBlock, MessageModule, RouterLink, SimpleItemCardList],
  templateUrl: './highlights.html',
  styleUrl: './highlights.scss'
})
export class Highlights {

  highlightList: ItemList[] = [];

  page = 0
  pageSize = 10;

  isLoading = false;

  constructor(
    private readonly highlightService: HighlightsService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly confirmationService: ConfirmationService
  ) {

    this.reloadItems();
  }

  editSelectedHightlight(id: any) {
    this.router.navigate([id, 'edit'], {
      relativeTo: this.activatedRoute
    });
  }

  deleteSelectedHighlight(event: Event) {

    console.log('ev: ', event)

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
        this.highlightService.deleteById(+event).subscribe(() => {
          this.messageService.add(
            { severity: 'success', summary: 'Deletado', detail: `Item ${+event} deletado com sucesso.`, life: 5000 }
          );
          this.reloadItems();
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Operação de remoção cancelada.' });
      }
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
