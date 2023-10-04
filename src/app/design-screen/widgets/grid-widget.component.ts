import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Widget } from './widget';
import { CreateViewComponent } from '../create-view/create-view.component';
import { CommonModule } from '@angular/common';
import { DivWidgetComponent, DivWidgetModule } from './div-widget.component';

import { Directive, ViewContainerRef } from '@angular/core';
import { WidgetManager } from './widgets.manager';

@Directive({
  selector: '[subComponent]',
  standalone: true,
})
export class GridDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'dynamic-grid-component',
  template: `<div
    [className]="base_class"
    [id]='elementDomId'
    (click)="signalParent()"
    (contextmenu)="contextMenu($event)"
    [ngStyle]="default_css"
    [style]="customStyle"
  >
    <ng-template subComponent></ng-template>
  </div>`,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule, GridDirective, DivWidgetModule, DivWidgetComponent],
  host: {
    '[class]': 'host_class',
  },
})
export class GridWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  classes: any = ['editor-component'];
  @ViewChild(GridDirective, { static: true }) override root!: GridDirective;
  cols = 2;
  override attributes = {
    Columns: {
      type: 'number',
      value: '' + this.cols,
      dialog:
        'Are you sure about the no of columns? The columns from the right will be purged.',
      trigger: (col: string) => parseInt(col) < this.cols,
      reset: () => (this.attributes['Columns']['value'] = '' + this.cols),
    },
  };

  public constructor() {
    super();
    this.widget_name = 'Grid';
    this.widget_class = ' row ';
    this.is_container = false;
    this.other_editor_class = ' editor-div grid-editor ';
  }
  public ngAfterContentInit() {
    if (this.children.length == 0) {
      this.createDiv(this.cols);
    }
  }
  public override setDefault()
  {
    super.setDefault();
    var isFormElement = this.getAncestor('Form') ? true: false
    if (isFormElement)
    {
      this.other_editor_class = 'form-div';
      this.setClass()
    }
  }
  private createDiv(n: number) {
    var widgetMgr = WidgetManager.getEditorSubscriber();
    for (let i = 0; i < n; i++) {
      widgetMgr.setRoot(this.getRoot());
      var div = widgetMgr.insertWidget('Div', this);
      div.instance.host_class += ' col ';
    }
  }
  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override encodeJsonObject(render=false) {
    var obj = super.encodeJsonObject(render);
    obj['cols'] = this.cols;
    return obj;
  }

  public override updateAttributes(jsonObject: any) {
    this.attributes['Columns']['value'] = jsonObject['cols'];
  }

  public override decodeJsonObject(jsonObject: any, idMapping:any): this {
    super.decodeJsonObject(jsonObject, idMapping);
    this.cols = parseInt(jsonObject['cols']);
    return this;
  }
  public override updateValues(object: any, event: string) {
    if (object.customAttributes['Columns']['value'].trim() != '') {
      var new_cols = parseInt(object.customAttributes['Columns']['value']);
      if (new_cols > this.cols) this.createDiv(Math.abs(this.cols - new_cols));
      else {
        var widgetMgr = WidgetManager.getEditorSubscriber();
        for (let i = new_cols; i < this.cols; i++) {
          widgetMgr.deleteWidget(this.children[i].instance, this);
        }
      }
      this.cols = new_cols;
      this.attributes['Columns']['value'] = '' + this.cols;
    }
    super.updateValues(object, event);
  }
  public override getRoot(): undefined | ViewContainerRef {
    return this.root.viewContainerRef;
  }
  public override signalChildrenDeleted() {
    this.cols--;
    this.attributes['Columns']['value'] = '' + this.cols;
  }
}
