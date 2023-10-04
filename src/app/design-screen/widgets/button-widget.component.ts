import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Widget } from './widget';
import { CreateViewComponent } from '../create-view/create-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamic-button-component',
  template: `<button type="button" [id]='elementDomId' [className]="base_class + bootstrap_button_class" (click)="signalParent()" (contextmenu)='contextMenu($event)'
  [ngStyle]="default_css" [style]="customStyle" (click)="actions['click']()">
    {{ value }}
  </button>`,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonWidgetComponent extends Widget {
  @Input() override value = 'Button';
  @Output() valueChangeEmitter = new EventEmitter();
  bootstrap_button_class = 'btn btn-primary'
  classes:any = ['editor-component']

  public constructor(){
    super()
    this.widget_name = 'Button';
  }

  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override updateValues(object: any, event:string) {
    super.updateValues(object, event)
    switch(event)
    {
      case 'BootstrapColor':
        this.bootstrap_button_class = 'btn btn-' + object.bootstrapColorScheme
        break;
    }
  }
}
