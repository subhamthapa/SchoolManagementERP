import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { Widget } from './widget';
import { CreateViewComponent } from '../create-view/create-view.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Directive, ViewContainerRef } from '@angular/core';
import { DivWidgetComponent } from './div-widget.component';

@Directive({
  selector: '[subComponent]',
  standalone: true,
})
export class FlexDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'flex-component',
  template: `<div
    [className]="base_class"
    (click)="signalParent()"
    (contextmenu)="contextMenu($event)"
    [ngStyle]="default_css"
    [style]="customStyle"
  >
    <ng-template subComponent class="m-2 flex-fill"></ng-template>
  </div>`,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, FlexDirective],
})
export class FlexWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  classes: any = ['editor-component'];
  @ViewChild(FlexDirective, { static: true }) override root!: FlexDirective;
  override attributes = {
    FlexFill: {
      type: 'boolean',
      value: true,
    },
  };

  public constructor() {
    super();
    this.widget_name = 'Flex';
    this.widget_class = 'd-flex flex-sm-row flex-column ';
    this.is_container = true;
    this.other_editor_class = ' editor-flex ';
  }

  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override encodeJsonObject(render=false) {
    var obj = super.encodeJsonObject(render);
    obj['attributes'] = this.attributes;
    return obj;
  }

  public updateFlexFill(attribute: any)
  {
    for (let elem of this.children) {
      if (attribute['FlexFill']['value'])
        elem.instance.host_class = ' flex-fill fill_width m-2 ';
      else elem.instance.host_class = '';
    }
  }
  public override afterDecodeUpdateAttributes(attribute: any) {
    this.updateFlexFill(attribute)
  }
  public override decodeJsonObject(jsonObject: any, idMapping:any): this {
    super.decodeJsonObject(jsonObject, idMapping);
    this.attributes = jsonObject['attributes'];
    this.afterDecodeUpdateAttributes(this.attributes);
    return this;
  }

  public override updateValues(object: any, event: string) {
    super.updateValues(object, event);
    switch (event) {
      case 'FlexFill':
        for (let elem of this.children) {
          this.updateFlexFill(object.customAttributes)
        }
    }
  }
  public override getRoot(): undefined | ViewContainerRef {
    return this.root.viewContainerRef;
  }
  public override applyRule(element: Widget) {
    element.base_class += ' fill_height ';
    element.host_class = ' flex-fill fill_width m-2 ';
  }
}
