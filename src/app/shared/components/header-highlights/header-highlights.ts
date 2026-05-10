import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { interval } from 'rxjs';

@Component({
  selector: 'app-header-highlights',
  imports: [CommonModule],
  templateUrl: './header-highlights.html',
  styleUrl: './header-highlights.scss'
})
export class HeaderHighlights implements OnInit, OnDestroy {

  buttonArray?: number[];
  currentImg = `image-1-anim`;
  selectedImgIndex = 1;

  timeInterval?: any;

  @Input()
  set imagesAmount(value: number) {
    this.buttonArray = Array.from({ length: value }, (_, i) => i + 1);
  }

  ngOnInit(): void {
   this.timeInterval = interval(2000).subscribe(() => this.next(++this.selectedImgIndex));
  }

  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

  next(value: number) {
    console.log('ola')
    if(value > 6) {
      value = 1;
    }
    this.currentImg = `image-${value}-anim`;
    this.selectedImgIndex = value;
  }
}
