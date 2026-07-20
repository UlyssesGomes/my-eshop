import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { HighlightsService } from './highlights.service';
import { ItemList } from '../../shared/models/item-list/item-list';
import { LoadingBlock } from '../../shared/components/loading-block/loading-block';
import { SimpleItemCardList } from '../../shared/components/simple-item-card-list/simple-item-card-list';
import { CoreList } from '../../shared/core/core-list';
import { ServiceCore } from '../../shared/services/service-core';

@Component({
  selector: 'app-highlights',
  imports: [CommonModule, ButtonModule, ConfirmDialogModule, ContentPanel, LoadingBlock, PaginatorModule, RouterLink, SimpleItemCardList],
  templateUrl: './highlights.html',
  styleUrl: './highlights.scss'
})
export class Highlights extends CoreList<ItemList> {

  highlightList: ItemList[] = [];

  filterForm: FormGroup;

  constructor(
    private readonly highlightService: HighlightsService,
    private readonly fb: FormBuilder
  ) {
    super();
    this.filterForm = this.fb.group({
      name: ['', []]
    });
  }

  public override loadList() {
    this.isLoading = true;
    this.highlightService.listWithPagination(this.first, this.pageSize).subscribe({
      next: (response) => {
        let highlights = response.content;
        this.totalElements = response.page.totalElements;

        if ((this.first / this.pageSize) >= response.page.totalPages) {
          this.first -= this.pageSize;
          this.loadList();
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
        this.notification.error(error.title, error.description);
        this.isLoading = false;
      }
    });
  }

  public override getService(): ServiceCore<ItemList> {
    return this.highlightService;
  }

  public override getFilterForm(): FormGroup {
    return this.filterForm;
  }

}
