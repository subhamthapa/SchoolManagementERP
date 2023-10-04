import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Widget } from './widget';
import { CreateViewComponent } from '../create-view/create-view.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[subComponent]',
  standalone: true,
})
export class CardDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}


@Component({
  selector: 'dynamic-card-component',
  template: `<div [className]="base_class" [id]="elementDomId" [hidden]="hidden" (click)="signalParent()" (contextmenu)='contextMenu($event)'
  [ngStyle]="default_css" [style]="customStyle">
    <div class="card-body">
      {{ value }}
      <ng-template subComponent></ng-template>
    </div>
</div>`,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, CardDirective],
  host:{
    '[class]': 'host_class'
  }
})
export class CardWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  classes:any = ['editor-component']
  @ViewChild(CardDirective, { static: true }) override root!: CardDirective;

  public constructor(){
    super()
    this.widget_name = 'Card';
    this.widget_class = " card "
    this.is_container = true
  }

  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override updateValues(object: any, event:string) {
    super.updateValues(object, event)
  }
  public override getRoot(): undefined | ViewContainerRef {
    return this.root.viewContainerRef
  }
}
