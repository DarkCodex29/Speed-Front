import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numbersOnly]',
  standalone: true,
})
export class NumberOnlyDirective {
  public constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) public onInputChange(event: Event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
