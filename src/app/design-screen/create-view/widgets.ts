import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';

interface Widget {
  name: string;
  children?: Widget[];
}

const TREE_DATA: Widget[] = [
  {
    name: 'Input',
    children: [{ name: 'String' }, { name: 'Text' }, { name: 'Date' }, { name: 'Checkbox' }, {name: 'RadioButton'}],
  },
  {
    name: 'Forms',
    children: [{ name: 'Basic Input Form' }],
  },
  {
    name: 'Layout',
    children: [{ name: 'Grid' }, { name: 'Flex' }],
  },
  {
    name: 'Section',
    children: [
      { name: 'Paragraph' },
      { name: 'Heading' },
      { name: 'HR' },
      { name: 'Div' },
      { name: 'Card' },
      { name: 'ImageCard' },
      { name: 'Image' },
    ],
  },
  {
    name: 'Buttons',
    children: [{ name: 'Button' }, { name: 'Checkbox' }],
  },
];

export interface WidgetNode {
  expandable: boolean;
  name: string;
  level: number;
}

export class Transformer {
  public _transformer = (node: Widget, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
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
    (node) => node.children
  );

  public dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  public getDataSource() {
    return this.dataSource;
  }

  public hasChild = (_: number, node: WidgetNode) => node.expandable;
}
