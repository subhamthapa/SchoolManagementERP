import { Component, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { AddModel } from './add-model.sub.component';
import { ViewChild } from '@angular/core';
import { Constants } from './constants';
import { Grid } from '../utilities/grid';
import { Model } from '../utilities/model';
import { DataModelManagerService } from './data-model-manager.service';
import { Serializer } from 'ts-json-api-formatter';
import { DataModelMetadata } from './typedefs';
import { QueryViewComponent } from './query-view/query-view.component';

@Component({
  selector: 'app-data-model-manager',
  templateUrl: './data-model-manager.component.html',
  styleUrls: ['./data-model-manager.component.css'],
})
export class DataModelManagerComponent implements OnInit {
  @ViewChild(QueryViewComponent) queryComponent!: QueryViewComponent
  addModelRef = {} as MatBottomSheetRef<AddModel>;
  dataModelGrid = new Grid(3);
  serializedGrid:any = []
  currentTab = 0

  constructor(
    private _bottomSheet: MatBottomSheet,
    private dataModelService: DataModelManagerService
  ) {}

  ngOnInit(): void {
    if (this.dataModelGrid.isEmpty()) {
      this.dataModelService.getDataModelServiceObservable().subscribe(
        (success) => {
          console.log(success)
          this.dataModelGrid.refreshGrid(success, {
            moreInfo: false,
            purged: false
          });
          this.dataModelGrid.applyChanges();
          this.serializedGrid = this.dataModelGrid.serializeIntoOneArray()
        },
        (error) => {}
      );
    }
  }

  openAddModelPanel() {
    this.addModelRef = this._bottomSheet.open(AddModel);
    this.addModelRef.afterDismissed().subscribe((data) => {
      data["moreInfo"] = false
      this.dataModelGrid.addIntoGrid(data)
      this.dataModelGrid.applyChanges();
      this.serializedGrid = this.dataModelGrid.serializeIntoOneArray()
    });
  }
  formatJson(data: any, index:any) {
    var metaData = new DataModelMetadata();
    console.log(data)
    metaData.title = data.title;
    for (let i=0; i < data.prefixItems.length; i++) {
      console.log(data.prefixItems[i])
      var dataType = data.prefixItems[i]["$ref"].substring(data.prefixItems[i]["$ref"].lastIndexOf("/") + 1)
      metaData.columns.push(
        {
          name: data.columns[i],
          type: dataType == "number"? "float" : dataType,
          colSeqId: i
        }
      )
    }
    metaData.columnsSchemaRef = data.prefixItems;
    metaData.index = index

    return metaData;
  }
  refresh()
  {
    this.dataModelGrid = new Grid(3)
    this.dataModelService.getDataModelServiceObservable().subscribe(
      (success) => {
        console.log(success)
        this.dataModelGrid.refreshGrid(success, {
          moreInfo: false,
          purged: false
        });
        this.dataModelGrid.applyChanges();
        this.serializedGrid = this.dataModelGrid.serializeIntoOneArray()
        this.queryComponent.reset()
      },
      (error) => {}
    );
  }
}
