import { Component, OnInit, ViewChild } from '@angular/core';
import  { Transformer } from './widgets'
import { UIBuilder } from '../ui-builder';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { WidgetDirective } from '../widgets/directive'
import { ParagraphWidgetComponent } from '../widgets/paragraph-widget.component';
import { Renderer2 } from '@angular/core';
import { Attributes } from './attribute';


@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.css']
})
export class CreateViewComponent implements OnInit {
  widgets = true
  innerHtml:SafeHtml = ""
  transformer = new Transformer()
  builder!:UIBuilder
  attributes = new Attributes()

  @ViewChild(WidgetDirective, {static: true}) widgetHost!: WidgetDirective;

  constructor(private sanitized: DomSanitizer, private renderer: Renderer2, private document: Document) {
    this.builder = new UIBuilder(renderer, document)
  }

  ngOnInit(): void {
  }

  insert(name: string)
  {
    this.builder.insertWidget(name)
    this.builder.renderComponents(this.selectForAttribute, this)
  }
  selectForAttribute($object:any, viewObject: any)
  {
    viewObject.attributes.setAttributes($object)
  }
}
