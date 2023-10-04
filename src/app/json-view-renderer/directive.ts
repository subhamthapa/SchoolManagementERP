import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[webPage]',
})
export class RendererDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
