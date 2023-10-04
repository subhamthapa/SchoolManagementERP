import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Widget } from './widget';
import { CommonModule } from '@angular/common';
import { CreateViewComponent } from '../create-view/create-view.component';

@Component({
  selector: 'dynamic-paragraph-component',
  template: `<p
    [className]="base_class"
    (click)="signalParent()"
    [id]="elementDomId"
    [ngStyle]="default_css"
    (contextmenu)="contextMenu($event)"
    [style]="customStyle"
    [style]="customStyle"
    [hidden]="hidden"
  >
    {{ value }}
  </p>`,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ParagraphWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  override widget_name = 'Paragraph';

  public constructor() {
    super();
    this.widget_name = 'Paragraph';
    this.value = 'Paragraph';
  }
  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override updateValues(object: any, event: string) {
    super.updateValues(object, event);
  }
}
