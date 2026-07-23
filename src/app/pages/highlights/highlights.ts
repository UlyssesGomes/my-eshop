import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { HighlightsService } from './highlights.service';
import { ItemList } from '../../shared/models/item-list/item-list';
import { LoadingBlock } from '../../shared/components/loading-block/loading-block';
import { SimpleItemCardList } from '../../shared/components/simple-item-card-list/simple-item-card-list';
import { CoreList } from '../../shared/core/core-list';
import { ServiceCore } from '../../shared/services/service-core';

@Component({
  selector: 'app-highlights',
  imports: [
    CommonModule, 
    ButtonModule, 
    ContentPanel,
    LoadingBlock, 
    PaginatorModule, 
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    SimpleItemCardList
  ],
  templateUrl: './highlights.html',
  styleUrl: './highlights.scss'
})
export class Highlights extends CoreList<ItemList> {

  filterForm: FormGroup;

  constructor(
    private readonly highlightService: HighlightsService,
    private readonly fb: FormBuilder
  ) {
    super();
    this.filterForm = this.fb.group({
      link: ['', []]
    });

    this.filterForm.controls['link'].valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.loadList());
  }

  public override loadList() {
    this.isLoading = true;
    this.highlightService.listWithPagination(this.first, this.pageSize, this.filterForm.value).subscribe({
      next: (response) => {
        let highlights = response.content;
        this.totalElements = response.page.totalElements;

        this.paginatedItems = highlights.map((h: any) => {
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
