import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-multifield-panel',
  imports: [ CommonModule, ButtonModule ],
  templateUrl: './multifield-panel.html',
  styleUrl: './multifield-panel.scss'
})
export class MultifieldPanel {
  @Input()
  title?: string;

  @Input()
  buttonLabel = 'Adicionar';

  @Output()
  eventButton: EventEmitter<any> = new EventEmitter();

  eventButtonFunction() {
    this.eventButton.emit();
  }
}
