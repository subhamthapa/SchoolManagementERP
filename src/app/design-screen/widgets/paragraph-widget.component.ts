import { Component, Input } from '@angular/core'
@Component({
  selector: 'dynamic-component',
  template: `<h2>{{value}}</h2>`
})
export class ParagraphWidgetComponent {
  @Input() value = ""
}
