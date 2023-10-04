import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Widget } from './widget'
import { CommonModule } from '@angular/common'
import { CreateViewComponent } from '../create-view/create-view.component';

@Component({
  selector: 'dynamic-heading-component',
  template: `<h1 [className]="base_class" (click)="signalParent()" [ngStyle]="default_css" (contextmenu)='contextMenu($event)' [style]="customStyle">{{value}}</h1>`,
  styleUrls:['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HeadingWidgetComponent extends Widget{
  @Input() override value = "Heading"
  @Output() valueChangeEmitter = new EventEmitter();

  override attributes = {
    Center: {
      type: 'boolean',
      value: false,
    },
  };

  public constructor(){
    super()
    this.default_css['font-size'] = '30px'
    this.widget_name = 'Heading';
  }

  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value)
  }

  public override updateValues(object: any, event: string) {
    super.updateValues(object, event);
    switch (event) {
      case 'Center':
        if (object.customAttributes && object.customAttributes["Center"]["value"])
        {
          this.classList.push('text-center')
        }
        else
        {
          delete this.classList[this.classList.indexOf('text-center')]
        }
        this.setClass();
        break;
    }
  }
}
