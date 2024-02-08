import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appdropdown]',
  standalone:true
})
export class DropdownDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('click') onClick() {
    const ul:HTMLElement = this.elRef.nativeElement.nextElementSibling;
    if (ul && ul.tagName === 'UL') {
      ul.classList.toggle('show');
    }
  }
}
