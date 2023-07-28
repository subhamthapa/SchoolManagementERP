import { Component, OnInit, Input } from '@angular/core';
import { Attributes } from '../attribute';

@Component({
  selector: 'app-attribute-view',
  templateUrl: './attribute-view.component.html',
  styleUrls: ['./attribute-view.component.css']
})
export class AttributeViewComponent implements OnInit {
  @Input() attributes!: Attributes
  bootstrapColorDetail = [
    {display: "Primary", value: "primary"},
    {display: "Secondary", value: "secondary"},
    {display: "Success", value: "success"},
    {display: "Info", value: "info"},
    {display: "Warning", value: "warning"},
    {display: "Danger", value: "danger"}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
