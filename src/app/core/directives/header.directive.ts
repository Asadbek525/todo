import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeader]',
  standalone: true,
})
export class HeaderDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.fontSize = '20px';
    this.el.nativeElement.style.color = 'black';
    this.el.nativeElement.style.fontWeight = 'bold';
  }
}
