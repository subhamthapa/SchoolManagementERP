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

@Directive({
  selector: '[subComponent]',
  standalone: true,
})
export class CardDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'dynamic-div-component',
  template: `<div
    [className]="base_class"
    (click)="signalParent()"
    (contextmenu)="contextMenu($event)"
    [id]='elementDomId'
    [ngStyle]="default_css"
    [style]="customStyle"
  >
    <ng-template subComponent></ng-template>
  </div>`,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, CardDirective],
  host: {
    '[class]': 'host_class',
  },
})
export class DivWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  classes: any = ['editor-component'];
  @ViewChild(CardDirective, { static: true }) override root!: CardDirective;

  public constructor() {
    super();
    this.widget_name = 'Div';
    this.widget_class = '';
    this.is_container = true;
    this.other_editor_class = " editor-div "
  }

  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override setDefault()
  {
    super.setDefault();
    var isGrid = this.getAncestor('Grid') ? true: false;
    if (isGrid)
    {
      this.base_class = this.is_editor_mode
        ? 'editor-div-grid-component' +
          this.other_editor_class +
          this.widget_class +
          this.root_class +
          this.shadow_class
        : this.widget_class + this.shadow_class;
    }
  }
  public override updateValues(object: any, event: string) {
    super.updateValues(object, event);
  }
  public override getRoot(): undefined | ViewContainerRef {
    return this.root.viewContainerRef;
  }
}

@NgModule({
  imports:[DivWidgetComponent],
  exports: [DivWidgetComponent]
})
export class DivWidgetModule {
}
