import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Widget } from './widget'
import { CommonModule } from '@angular/common'
import { CreateViewComponent } from '../create-view/create-view.component';

@Component({
  selector: 'dynamic-hr-component',
  template: `<div (contextmenu)='contextMenu($event)' style="padding: 1px;" [className]="base_class" (click)="signalParent()"><hr [className]="base_class" [ngStyle]="default_css" [style]="customStyle" (contextmenu)='contextMenu($event)'/></div>`,
  styleUrls:['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HrWidgetComponent extends Widget{
  @Output() valueChangeEmitter = new EventEmitter();

  public constructor(){
    super()
    this.default_css['font-size'] = '30px'
    this.widget_name = "HR"
  }

  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value)
  }

}
