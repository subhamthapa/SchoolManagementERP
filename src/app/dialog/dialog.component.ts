import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  onConfirm()
  {
    this.dialogRef.close(
      {
        flag: true
      }
    )
  }
  onDismiss()
  {
    this.dialogRef.close(
      {
        flag: false
      }
    )
  }
}
