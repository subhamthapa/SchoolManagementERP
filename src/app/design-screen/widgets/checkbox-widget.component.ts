import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Widget } from './widget';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CreateViewComponent } from '../create-view/create-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

type MatFormFieldAppearance = 'fill' | 'outline';
@Component({
  selector: 'dynamic-checkbox-component',
  template: `
    <div (click)="signalParent()" (contextmenu)="contextMenu($event)">
      <label>
        {{ label }}
      </label>
      <section
        class="example-form-field"
        *ngIf="!isFormElement"
        [ngStyle]="default_css"
        [style]="customStyle"
      >
        <mat-checkbox
          *ngFor="let box of checkboxes"
          [(ngModel)]="$any(box)['value']"
          (name)="(elementName)"
          >{{ box['name'] }}</mat-checkbox
        >
      </section>
      <div class="form-group" *ngIf="isFormElement">
        <section
          [ngStyle]="default_css"
          [style]="customStyle"
          style="width: 100% !important;"
        >
          <mat-checkbox
            *ngFor="let box of checkboxes"
            [(ngModel)]="$any(box)['value']"
            (name)="(elementName)"
            >{{ box['name'] }}</mat-checkbox
          >
        </section>
      </div>
      <div *ngIf="is_editor_mode" style="padding-bottom: 10px;">
        <mat-form-field appearance="outline">
          <mat-label>Add Checkbox</mat-label>
          <input matInput type="text" [(ngModel)]="checkboxLabel" />
          <button
            *ngIf="value"
            matSuffix
            mat-icon-button
            aria-label="Clear"
            (click)="value = ''"
          >
            <mat-icon>close</mat-icon>
          </button> </mat-form-field
        >&nbsp;
        <button mat-mini-fab color="primary" (click)="addCheckBox()">
          <mat-icon>add</mat-icon>
        </button>
        &nbsp;
        <button mat-mini-fab color="primary" (click)="addDeleteCheckBox()">
          <mat-icon>remove</mat-icon>
        </button>
      </div>
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
    MatCheckboxModule,
  ],
})
export class CheckboxWidgetComponent extends Widget {
  @Output() valueChangeEmitter = new EventEmitter();
  override widget_name = 'Checkbox';
  label = 'Default Label';
  outline: MatFormFieldAppearance = 'fill';
  checkboxes: any = [];
  isFormElement = false;
  checkboxLabel = '';
  override attributes = {
    Label: {
      type: 'string',
      value: this.label,
    },
  };
  public constructor() {
    super();
    this.widget_name = 'Checkbox';
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
  public override encodeJsonObject(render = false) {
    var obj = super.encodeJsonObject(render);
    obj['label'] = this.label;
    obj['outline'] = this.outline;
    obj['isFormElement'] = this.isFormElement || false;
    obj['checkboxes'] = this.checkboxes;
    obj['label'] = this.label;
    return obj;
  }

  public override decodeJsonObject(jsonObject: any, idMapping:any): this {
    super.decodeJsonObject(jsonObject, idMapping);
    this.isFormElement = jsonObject['isFormElement'];
    this.checkboxes = jsonObject['checkboxes'];
    this.attributes['Label']['value'] = jsonObject['label'];
    this.label = jsonObject['label'];
    return this;
  }

  public override updateValues(object: any, event: string) {
    this.label = object.customAttributes['Label']['value'];
    this.label = object.customAttributes['Label']['value'];
    if (!object.customAttributes['Fill']['value']) {
      this.outline = 'outline';
    } else {
      this.outline = 'fill';
    }
    super.updateValues(object, event);
  }
  public addCheckBox() {
    if (this.checkboxLabel.trim() == '') {
      return;
    }
    this.checkboxes.push({
      name: this.checkboxLabel,
      value: false,
    });
    this.checkboxLabel = '';
  }
  public addDeleteCheckBox() {
    this.checkboxes.pop();
  }
  public override getValue(data: any) {
    data[this.elementDomId] = this.checkboxes
  }
}
