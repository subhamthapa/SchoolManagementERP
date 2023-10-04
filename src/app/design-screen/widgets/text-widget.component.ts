import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Widget } from './widget';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CreateViewComponent } from '../create-view/create-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dynamic-text-component',
  template: `
    <textarea *ngIf="!isFormElement"
        (click)="signalParent()"
        [class]='base_class'
        [ngStyle]="default_css"
        (contextmenu)="contextMenu($event)"
        [style]="customStyle"
        [placeholder]="label"
        [(ngModel)] = "value">
    </textarea>
    <div *ngIf="isFormElement" class="form-group">
      <label>{{label}}</label>
      <textarea
        (click)="signalParent()"
        [class]='base_class'
        [ngStyle]="default_css"
        (contextmenu)="contextMenu($event)"
        [style]="customStyle"
        [(ngModel)] = "value"
        (name) = "elementName"
        >
      </textarea>
    </div>
    `,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, FormsModule, MatButtonModule],
  host: {
    '[class]': "isFormElement ? 'form-group': ''",
  },
})
export class TextWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  override widget_name = 'String';
  label = "Default Label"
  override attributes = {
    Label: {
      type: "string",
      value: this.label
    }
  };
  isFormElement = false;
  public constructor() {
    super();
    this.widget_name = 'Text';
    this.widget_class = " form-control ";
    this.value = '';
    this.is_input_type = true;
  }
  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override encodeJsonObject(render=false) {
    var obj = super.encodeJsonObject(render);
    obj['label'] = this.label;
    return obj;
  }

  public override decodeJsonObject(jsonObject: any, idMapping:any): this {
    super.decodeJsonObject(jsonObject, idMapping);
    this.attributes['Label']['value'] = jsonObject['label'];
    this.label = jsonObject['label'];
    return this;
  }

  public override updateValues(object: any, event: string) {
    this.label = object.customAttributes["Label"]["value"];
    super.updateValues(object, event);
  }
  public override setDefault()
  {
    super.setDefault();
    this.isFormElement = this.getAncestor('Form') ? true: false
  }
}
