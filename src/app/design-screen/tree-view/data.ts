import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';

interface Widget {
  name: string;
  object: any;
  children?: Widget[];
}

export var TREE_DATA: Widget[] = [
  {
    name: 'Body',
    object: null,
    children: [
    ],
  },
];

export interface WidgetNode {
  expandable: boolean;
  name: string;
  level: number;
  object: any;
}

export class Transformer {
  public _transformer = (node: Widget, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      object: node.object
    };
  };
  public treeControl = new FlatTreeControl<WidgetNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  public treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,

  );

  public dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );

  constructor(dataSource: any) {
    this.dataSource.data = dataSource;
  }

  public getDataSource() {
    return this.dataSource;
  }
  public setDataSource(dataSource: any)
  {
    this.dataSource.data = dataSource
  }

  public hasChild = (_: number, node: WidgetNode) => node.expandable;
}
