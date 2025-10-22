import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEllipisTooltip]'
})
export class EllipisTooltip {

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    const element = this.el.nativeElement;
    if (element.offsetWidth < element.scrollWidth) {
      element.title = element.textContent?.trim() || '';
    } else {
      element.title = '';
    }
  }

}
