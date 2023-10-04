import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { DataModelManagerComponent } from './data-model-manager.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Constants } from './constants';
import { Grid } from '../utilities/grid';
import { DialogComponent } from '../dialog/dialog.component';
import { DataModelManagerService } from './data-model-manager.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'add-model-sub-component',
  templateUrl: './add-model.sub.component.html',
  standalone: true,
  styleUrls:['./add-model.sub.component.css'],
  imports: [
    MatBottomSheetModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ],
})
export class AddModel {
  dataTypes: any[] = [];
  addColumnJson = '';
  addColumn = {};
  grid = new Grid(3);
  columnName = '';
  columnType = '';
  useJSON = false
  dataModelName = ""
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<DataModelManagerComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private dataModelManagerService: DataModelManagerService
  ) {
    for (let elem of Constants.dataTypes)
      this.dataTypes.push({ value: elem, viewValue: elem });
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  addColumnIntoIndex() {
    if (this.columnName.trim() == "")
    {
      this.snackbar.open('Column Name and Column Type cannot be blank', 'Ok', {
        duration: 800,
      });
      return
    }
    if (this.columnType.trim() == "")
    {
      this.snackbar.open('Column Name and Column Type cannot be blank', 'Ok', {
        duration: 800,
      });
      return
    }
    this.grid.addIntoGrid({
      "name": this.columnName,
      "type": this.columnType,
      "index": false
    })
    this.columnName = ""
    this.columnType = ""
  }
  deleteColumn(col: number, i: number)
  {
    this.grid.deleteFromGrid(col, i)
    this.grid.reShuffleGrid()
  }
  createDataModel()
  {
    if(this.grid.isDefEmpty())
    {
      this.snackbar.open('Please add some columns', 'Ok', {
        duration: 800,
      });
      return
    }
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Do you want to create this data model?',
        body: '',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (event['flag']) {
        this.grid.applyChanges()
        var columns:any = this.grid.serializeIntoOneArray()
        var index = []
        for (let col of columns)
        {
          if(col.index == true)
          {
            index.push(col.name)
          }
        }
        var json = {
          "dataModelName": this.dataModelName,
          "columns": columns,
          "index": index
        }
        this.dataModelManagerService.addDataModelServiceObservable(json).subscribe(
          success=>
          {
            this._bottomSheetRef.dismiss(success);
            this.snackbar.open('Data model added successfully', 'Ok', {
              duration: 800,
            });
          }
          ,
          error=>
          {

          }
        )

      }
    })
  }
}
