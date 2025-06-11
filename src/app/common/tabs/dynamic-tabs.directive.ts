import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicTabs]',
})
export class DynamicTabsDirective {
  public constructor(public viewContainer: ViewContainerRef) {}
}
