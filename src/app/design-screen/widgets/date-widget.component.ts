import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Widget } from './widget';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CreateViewComponent } from '../create-view/create-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

type MatFormFieldAppearance = 'fill' | 'outline';
@Component({
  selector: 'dynamic-input-component',
  template: `
    <mat-form-field
      class="example-form-field"
      [appearance]="outline"
      *ngIf="!isFormElement"
      (click)="signalParent()"
      [ngStyle]="default_css"
      (contextmenu)="contextMenu($event)"
      [style]="customStyle"
    >
      <mat-label>{{ label }}</mat-label>
      <input matInput type="text" [class]="base_class" [(ngModel)]="value" />
      <button
        *ngIf="value"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="value = ''"
      >
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
    <div class="form-group" *ngIf="isFormElement">
      <mat-form-field
        [appearance]="outline"
        (click)="signalParent()"
        [ngStyle]="default_css"
        (contextmenu)="contextMenu($event)"
        [style]="customStyle"
        style="width: 100% !important;"
      >
        <mat-label>{{ label }}</mat-label>
        <input matInput type="text" [class]="base_class" [(ngModel)]="value" [matDatepicker]="picker"/>
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="picker">
          <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
        </mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['../create-view/create-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class DateWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  override widget_name = 'Date';
  label = 'Default Label';
  outline: MatFormFieldAppearance = 'fill';
  override attributes = {
    Label: {
      type: 'string',
      value: this.label,
    },
    Fill: {
      type: 'boolean',
      value: true,
    },
  };

  isFormElement = false;

  public constructor() {
    super();
    this.widget_name = 'Date';
    this.value = '';
    this.is_input_type = true;
  }
  public emitSingalParaent(): void {
    this.valueChangeEmitter.emit(this.value);
  }

  public override setDefault() {
    super.setDefault();
    this.isFormElement = this.getAncestor('Form') ? true : false;
  }
  public override encodeJsonObject(render=false) {
    var obj = super.encodeJsonObject(render);
    obj['label'] = this.label;
    obj['outline'] = this.outline;
    obj['isFormElement'] = this.isFormElement || false;
    return obj;
  }

  public override decodeJsonObject(jsonObject: any, idMapping: any): this {
    super.decodeJsonObject(jsonObject, idMapping);
    this.attributes['Label']['value'] = jsonObject['label'];
    this.label = jsonObject['label'];
    this.outline = jsonObject['outline'];
    this.attributes['Fill']['value'] = this.outline == 'fill' ? true : false;
    this.isFormElement = jsonObject['isFormElement'];
    return this;
  }

  public override updateValues(object: any, event: string) {
    this.label = object.customAttributes['Label']['value'];
    if (!object.customAttributes['Fill']['value']) {
      this.outline = 'outline';
    } else {
      this.outline = 'fill';
    }
    super.updateValues(object, event);
  }
}
