import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[speedHost]',
})
export class DialogDirective {
  public constructor(public viewContainerRef: ViewContainerRef) {}
}
