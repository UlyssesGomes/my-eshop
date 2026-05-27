import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { interval } from 'rxjs';

import { Highlight } from '../../models/highlight/highlight';

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
  highlights?: Highlight [] = [
    {
      link: '/link1',
      img: 'https://picsum.photos/id/374/800/600'
    },
    {
      link: '/link2',
      img: 'https://picsum.photos/id/175/800/600'
    },
    {
      link: '/link3',
      img: 'https://picsum.photos/id/188/800/600'
    },
    {
      link: '/link4',
      img: 'https://picsum.photos/id/211/800/600'
    },
    {
      link: '/link5',
      img: 'https://picsum.photos/id/22/800/600'
    },
    {
      link: '/link6',
      img: 'https://picsum.photos/id/28/800/600'
    },
  ];

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
    if(value > 6) {
      value = 1;
    }
    this.currentImg = `image-${value}-anim`;
    this.selectedImgIndex = value;
  }

  selectImage(imageIndex: number) {
    // TODO - redirect to link of the image
    console.log(`image ${imageIndex} selected.`);
  }
}
