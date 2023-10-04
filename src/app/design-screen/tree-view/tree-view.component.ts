import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { CreateViewComponent } from '../create-view/create-view.component';
import { Transformer } from './data';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WidgetManager } from '../widgets/widgets.manager';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  standalone: true,
  imports: [MatTreeModule, MatIconModule, MatButtonModule, MatTooltipModule, CommonModule],
})
export class TreeViewComponent {
  manager: any = null;
  dataSource = [
    {
      name: 'Body',
      object: null,
      children: [],
    },
  ];
  transformer = new Transformer(this.dataSource);
  public constructor(
    private _bottomSheetRef: MatBottomSheetRef<CreateViewComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    //this.transformer.setDataSource(this.dataSource)
  }
  createTreeNode(node: any, treeData: any) {
    var data = {
      name: node.instance.widget_name,
      object: node,
      children: [],
    };
    for (let x of node.instance.children) {
      this.createTreeNode(x, data);
    }
    treeData.children.push(data);
  }
  ngOnInit() {
    this.manager = WidgetManager.getEditorSubscriber();
    var dataSource = {
      name: 'Body',
      object: null,
      children: [],
    };
    this.dataSource[0] = dataSource;
    for (let node of this.manager.widgetTree) {
      this.createTreeNode(node, this.dataSource[0]);
    }
    this.transformer.setDataSource(this.dataSource);
  }
  select(node: any) {
    if(node.object)
      node.object.location.nativeElement.children[0].click();
  }
  setAsRoot(node: any) {
    this.data['owner'].setAsRootUsingCaller(node.instance);
  }
  setBodyAsRoot()
  {
    this.data['owner'].unsetAsRoot();
  }
}
