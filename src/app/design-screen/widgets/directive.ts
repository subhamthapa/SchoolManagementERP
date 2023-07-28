import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class WidgetDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
