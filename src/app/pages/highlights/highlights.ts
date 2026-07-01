import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { HighlightsService } from './highlights.service';
import { ItemList } from '../../shared/models/item-list/item-list';
import { LoadingBlock } from '../../shared/components/loading-block/loading-block';
import { SimpleItemCardList } from '../../shared/components/simple-item-card-list/simple-item-card-list';
import { NotificationService } from '../../shared/services/notification/notification.service';

@Component({
  selector: 'app-highlights',
  imports: [CommonModule, ButtonModule, ConfirmDialogModule, ContentPanel, LoadingBlock, PaginatorModule, RouterLink, SimpleItemCardList],
  templateUrl: './highlights.html',
  styleUrl: './highlights.scss'
})
export class Highlights {

  highlightList: ItemList[] = [];

  first = 0
  pageSize = 10;
  totalElements = 0;

  isLoading = false;

  constructor(
    private readonly highlightService: HighlightsService,
    private readonly messageService: NotificationService,
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
          this.messageService.success('Deletado', `Item ${+event} deletado com sucesso.`);
          this.reloadItems();
        });
      },
      reject: () => {
        this.messageService.warning('Cancelado', 'Operação de remoção cancelada.');
      }
    });



  }

  reloadItems() {
    this.isLoading = true;
    this.highlightService.listWithPagination(this.first, this.pageSize).subscribe({
      next: (response) => {
        let highlights = response.content;
        this.totalElements = response.page.totalElements;

        if((this.first / this.pageSize) >= response.page.totalPages) {
          this.first -= this.pageSize;
          this.reloadItems();
        }

        this.highlightList = highlights.map((h: any) => {
          const i = new ItemList();
          i.id = h.id;
          i.title = h.link;
          return i;
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.error(error.title, error.description);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.pageSize = event.rows ?? 10;
    this.reloadItems();
  }

}
