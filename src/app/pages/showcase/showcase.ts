import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HeaderHighlights } from '../../shared/components/header-highlights/header-highlights';

@Component({
  selector: 'app-showcase',
  imports: [CommonModule, HeaderHighlights],
  templateUrl: './showcase.html',
  styleUrl: './showcase.scss'
})
export class Showcase {

}
