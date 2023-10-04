import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Attributes } from '../create-view/attribute';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
})
export class CodeEditorComponent {
  @Input() attributes!: Attributes
  @Input() owner: any
  @Output() flag = new EventEmitter<any>()
  value = ""
  @Input() type = ""
  mapping:any = {
    "valueInit": ()=>{
      this.value = this.attributes.value
    },
    "valueStore": ()=>{
      this.attributes.value = this.value
    },
    "styleInit": ()=>{
      this.value = this.attributes.customStyle
    },
    "styleStore": ()=>{
      this.attributes.customStyle = this.value
    }
  }
  ngOnInit()
  {
    this.mapping[this.type + "Init"]()
  }
  onTab(event: any) {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea: any = document.querySelector('textarea');
      textarea.setRangeText(
        '  ',
        textarea.selectionStart,
        textarea.selectionStart,
        'end'
      );
    }
  }
  signalChange(eventName: string)
  {
    this.mapping[this.type + "Store"]()
    this.attributes.applyChange(eventName)
    this.owner.signalChanged()
  }
}
