import { Component, Input } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner'; 

@Component({
  selector: 'app-loading-block',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading-block.html',
  styleUrl: './loading-block.scss'
})
export class LoadingBlock {

  @Input()
  isLoading = false;

}
