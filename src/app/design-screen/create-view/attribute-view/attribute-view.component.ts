import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attributes } from '../attribute';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-attribute-view',
  templateUrl: './attribute-view.component.html',
  styleUrls: ['./attribute-view.component.css']
})
export class AttributeViewComponent implements OnInit {
  @Input() attributes!: Attributes
  @Output() value = new EventEmitter<any>()
  @Output() signal = new EventEmitter<boolean>()
  bootstrapColorDetail = [
    {display: "Primary", value: "primary"},
    {display: "Secondary", value: "secondary"},
    {display: "Success", value: "success"},
    {display: "Info", value: "info"},
    {display: "Warning", value: "warning"},
    {display: "Danger", value: "danger"}
  ]
  shadow = [
    {display: "", value: ""},
    {display: "small", value: "shadow-sm bg-white rounded"},
    {display: "regular", value: "shadow bg-white rounded"},
    {display: "large", value: "shadow-lg bg-white rounded"}
  ]
  dispalyIndividualPaddingElements = false
  dispalyIndividualMarginElements = false
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  signalChange(eventName: string)
  {
    if(this.attributes.customAttributes && eventName in this.attributes.customAttributes && "dialog" in (this.attributes.customAttributes as any)[eventName])
    {
      if((this.attributes.customAttributes as any)[eventName]["trigger"]((this.attributes.customAttributes as any)[eventName]["value"]))
      {
        var dialog = this.dialog.open(DialogComponent, {
          data: {
            heading: "Warning",
            body: (this.attributes.customAttributes as any)[eventName]["dialog"],
          },
        });
        dialog.afterClosed().subscribe((event) => {
          if (event['flag']) {
            this.attributes.applyChange(eventName)
            this.signal.emit(true)
          }
          else
          {
            (this.attributes.customAttributes as any)[eventName]["reset"]()
          }
        })
        return
      }
    }
    this.attributes.applyChange(eventName)
    this.signal.emit(true)
  }
}
