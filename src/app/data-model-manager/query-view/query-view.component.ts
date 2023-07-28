import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../constants';
import { DataModelManagerService } from '../data-model-manager.service';
import { ErrorHandler } from '../../utilities/error.handler';

@Component({
  selector: 'app-query-view',
  templateUrl: './query-view.component.html',
  styleUrls: [
    './query-view.component.css',
    '../data-model-manager.component.css',
  ],
})
export class QueryViewComponent implements OnInit {
  @Input() dataModels: any;
  selectedDm: any = {};
  queryTypes: any = [];
  queryType = 'JSON';
  queries: any = [];
  jsonQuery = '';
  query: any = {};
  dataSource: any = [];
  columns = [];
  isDataReturned = false;
  serverMessage = '';
  color = 'blueviolet';
  resultDockedToRight = false;
  queryHistory: any = [];
  constructor(private dataModelService: DataModelManagerService) {
    for (let elem of Constants.queryTypes)
      this.queryTypes.push({ value: elem, viewValue: elem });
    for (let elem of Constants.queries)
      this.queries.push({ value: elem, viewValue: elem });
  }

  ngOnInit(): void {
    this.selectedDm = this.dataModels[0];
  }
  resetEditor() {
    this.jsonQuery = '';
    this.query = {};
  }
  changeQuery() {
    this.query = Constants.getJsonQuery(this.jsonQuery, this.selectedDm);
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
  postQuery() {
    try {
      var json = JSON.parse('' + $('#jsonQueryEditor').val());
    } catch (e: any) {
      this.isDataReturned = false;
      this.color = 'red';
      this.serverMessage = e.message;
      return;
    }
    this.queryHistory.push(json);
    this.dataModelService.postQueryObservable(json).subscribe(
      (success: any) => {
        if (success['type'] == 'data') {
          let i = 0;
          var cols = this.selectedDm['meta_data']['columns'];
          var map: any = {};
          this.dataSource = [];
          for (let row of success['data']) {
            var map: any = {};
            i = 0;
            for (let col of cols) {
              map[col] = row[i];
              i++;
            }
            this.dataSource.push(map);
          }
          this.isDataReturned = true;
        } else if (success['type'] == 'purged') {
          this.isDataReturned = false;
          this.color = 'red';
          this.serverMessage = success['message'];
          this.selectedDm['purged'] = true;
        } else {
          if (success['type'] == 'meta_data') {
            this.selectedDm = success['data'];
          }
          this.isDataReturned = false;
          this.color = 'blueviolet';
          this.serverMessage = success['message'];
        }
      },
      (error) => {
        this.isDataReturned = false;
        this.color = 'red';
        this.serverMessage = ErrorHandler.getErrorTxt(error);
      }
    );
  }
  reset() {
    this.selectedDm = this.dataModels[0];
    this.jsonQuery = '';
    this.serverMessage = '';
    this.color = 'blueviolet';
    this.query = {};
  }
}
