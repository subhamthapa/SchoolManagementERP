import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CreateViewComponent } from '../create-view/create-view.component';
import { Behaviour } from './behaviour.manager';
import { Widget } from '../widgets/widget';

export class PipeLine {
  id_ = 0;
  behaviours: Behaviour[];
  public constructor(id: number) {
    this.id_ = id;
    this.behaviours = [];
  }
  public setUsingJsonObject(jsonObject: any) {
    this.id_ = jsonObject['id_'];
    for (let behavior of jsonObject['behaviours']) {
      var x = new Behaviour();
      x.applyJsonData(behavior);
      this.behaviours.push(x);
    }
  }
  public addBehaviour(behavior: Behaviour) {
    this.behaviours.push(behavior);
  }
  public debugDisplay() {
    console.log(this.behaviours);
  }
  bindBehaviour(widget: Widget) {
    for (let x of this.behaviours) {
      widget.bindEvents(x);
    }
  }
}

@Component({
  selector: 'app-behaviour',
  templateUrl: './behaviour.component.html',
  styleUrls: ['./behaviour.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class BehaviourComponent {
  pipelines: PipeLine[] = [];
  selectedPipeLine: any = null;
  selectedPipeLineId = -1;
  behaviourManager = new Behaviour();
  events = Behaviour.events;
  actions = Behaviour.actions;
  selectedEvent = null;
  selectedAction = '';
  inputs: number[] = [];
  input: any = {};
  public constructor(
    private _bottomSheetRef: MatBottomSheetRef<CreateViewComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.pipelines = data['context'].behaviour || [];
  }
  addPipeLine() {
    var pipeLine = new PipeLine(this.pipelines.length + 1);
    this.pipelines.push(pipeLine);
    this.selectedPipeLine = pipeLine;
    this.selectedPipeLineId = pipeLine.id_;
  }
  deletePipeLine() {
    this.pipelines.pop();
    this.selectedPipeLine = this.pipelines[this.pipelines.length - 1];
    this.selectedPipeLineId = this.selectedPipeLine.id_;
  }
  pipeLineChange() {
    this.selectedPipeLineId = this.selectedPipeLine;
    for (let behaviour of this.selectedPipeLine.behaviours) {
      this.mapInlineInputs(behaviour, true);
    }
  }
  addBehaviour() {
    this.selectedPipeLine.addBehaviour(new Behaviour());
  }
  deleteBehaviour() {}
  mapInlineInputs(behaviour: any, set = false) {
    switch (behaviour.triggerAction) {
      case 'changeColor':
        //this.inputs = Array.from({length: 1}, (_, index) => index + 1);
        this.inputs = [1];
        if (!set)
          behaviour.data = {
            1: {
              value: '',
              label: 'Enter Color',
            },
          };
        break;
      case 'applyCssOnTarget':
        this.inputs = [1];
        if (!set)
          behaviour.data = {
            1: {
              value: '',
              label: 'Inline css',
            },
          };
        break;
      case 'setValueUsingDataModel':
        this.inputs = [1];
        if (!set)
        {
          behaviour.data = {
            1: {
              value: '',
              label: 'DataModel Name -> column: ',
            },
          };
        }
        else
        {
          behaviour.data['targetElementId'] = this.data['context'].elementDomId
        }
        break;
    }
  }
  actionChanged(behaviour: any) {
    this.inputs = [];
    this.mapInlineInputs(behaviour);
  }
  save() {
    this.data['context'].applyBehaviour();
    this._bottomSheetRef.dismiss({ flag: true });
  }
}
