import { Component, ComponentRef, ViewContainerRef } from '@angular/core';
import { Widget } from './widget';
import { ParagraphWidgetComponent } from './paragraph-widget.component';
import { ButtonWidgetComponent } from './button-widget.component';
import { HeadingWidgetComponent } from './heading-widget.component';
import { HrWidgetComponent } from './hr-widget.component';
import { CardWidgetComponent } from './card-widget.component';
import { FlexWidgetComponent } from './flex.component';
import { ImageCardWidgetComponent } from './image-card-widget.component';
import { DivWidgetComponent } from './div-widget.component';
import { GridWidgetComponent } from './grid-widget.component';
import { StringInputWidgetComponent } from './input-widget.component';
import { TextWidgetComponent } from './text-widget.component';
import { FormWidgetComponent } from './form-widget.component';
import { CheckboxWidgetComponent } from './checkbox-widget.component';
import { RadioButtonWidgetComponent } from './radiobutton-widget.component';
import { DateWidgetComponent } from './date-widget.component';
import { ImageWidgetComponent } from './image-widget.component';

export class WidgetManager {
  widgetTree: any = Array<ComponentRef<any>>();
  size = 0;
  private viewContainerRef!: ViewContainerRef;
  private rootviewContainerRef!: ViewContainerRef;
  public constructor(private owner: any) {}

  public static subscribers: any = {
    'editor-object': null,
    'renderer-object': null,
  };
  public static addEditorSubsscriber(object: WidgetManager) {
    WidgetManager.subscribers['editor-object'] = object;
  }
  public static addRendererSubscriber(object: WidgetManager) {
    WidgetManager.subscribers['renderer-object'] = object;
  }
  public static getEditorSubscriber() {
    return WidgetManager.subscribers['editor-object'];
  }
  public static getRendererSubscriber() {
    return WidgetManager.subscribers['renderer-object'];
  }
  public resetRoot() {
    this.viewContainerRef = this.rootviewContainerRef;
  }
  public setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
    if (!this.rootviewContainerRef) {
      this.rootviewContainerRef = viewContainerRef;
    }
  }
  public setRoot(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  public clearScreen() {
    this.widgetTree = [];
    this.viewContainerRef.clear();
    localStorage.removeItem('jsonView');
  }
  public refreshScreen() {
    this.widgetTree = [];
    this.viewContainerRef.clear();
  }
  private search(widgetLists: any, widget: any) {
    var i = 0;
    for (let x of widgetLists) {
      if (
        x.instance.widget_name == widget.widget_name &&
        x.instance.uniqueKey == widget.uniqueKey
      ) {
        return i;
      }
      i++;
    }
    return -1;
  }
  public moveElement(element: any, direction: boolean) {
    if (element.owner == this.owner) {
      var index = this.search(this.widgetTree, element);
      if (index == 0 && direction == true) {
        return;
      }
      if (index == -1) {
        return;
      }
      if (index == this.widgetTree.length - 1 && direction == false) {
        return;
      }
      var widget = this.widgetTree[index];
      this.widgetTree.splice(index, 1);
      var widgetRef = this.viewContainerRef.get(index);
      if (direction) {
        this.widgetTree.splice(index - 1, 0, widget);
        this.viewContainerRef.move(widgetRef as any, index - 1);
      } else {
        this.widgetTree.splice(index + 1, 0, widget);
        this.viewContainerRef.move(widgetRef as any, index + 1);
      }
    } else {
      var index = this.search(element.owner.children, element);
      if (index == 0 && direction == true) {
        return;
      }
      if (index == -1) {
        return;
      }
      if (index == element.owner.children.length - 1 && direction == false) {
        return;
      }

      var widget = element.owner.children[index];
      element.owner.children.splice(index, 1);
      widgetRef = element.owner.root.viewContainerRef.get(index);
      if (direction) {
        element.owner.children.splice(index - 1, 0, widget);
        element.owner.root.viewContainerRef.move(widgetRef as any, index - 1);
      } else {
        element.owner.children.splice(index + 1, 0, widget);
        element.owner.root.viewContainerRef.move(widgetRef as any, index + 1);
      }
    }
  }
  public createWidget(widget: any, callerContext: any) {
    if (!this.viewContainerRef) {
      throw 'View Container Ref is not defined';
    }
    var widget_object: any = this.viewContainerRef.createComponent(widget);
    widget_object.instance.parent = this.owner;
    widget_object.instance.uniqueKey = widget.current_max_sequence++;
    this.owner.rootComponent.applyRule(widget_object.instance);
    if (callerContext && callerContext.getRoot() == this.viewContainerRef) {
      widget_object.instance.setOwner(callerContext);
      callerContext = callerContext.children.push(widget_object);
    } else {
      widget_object.instance.setOwner(this.owner);
      this.widgetTree.push(widget_object);
    }
    widget_object.instance.setDefault();
    this.size++;
    if(this.owner.constructor.name != "CreateViewComponent")
    {
      this.owner.jsonDecoder.widgetObjectIdMapping[widget_object.instance.elementDomId] = widget_object
    }
    return widget_object;
  }
  public deleteWidget(widget: Widget, root: any) {
    if (!this.viewContainerRef) {
      throw 'View Container Ref is not defined';
    }
    var widgetTree = this.widgetTree;
    var flag = false;
    if (root.constructor.name != 'CreateViewComponent') {
      widgetTree = root.children;
      flag = true;
    }
    var componentRef = widgetTree.filter((x: any) => {
      return (
        x.instance.widget_name == widget.widget_name &&
        x.instance.uniqueKey == widget.uniqueKey
      );
    });
    var contRef = this.viewContainerRef;
    if (flag) {
      contRef = root.root.viewContainerRef;
    }
    contRef.remove(contRef.indexOf(componentRef[0].hostView));
    componentRef[0].instance.owner.signalChildrenDeleted();
    if (!flag) {
      this.widgetTree = this.widgetTree.filter((x: any) => {
        return (
          (x.instance.uniqueKey != widget.uniqueKey &&
            x.instance.widget_name == widget.widget_name) ||
          x.instance.widget_name != widget.widget_name
        );
      });
    } else {
      root.children = widgetTree.filter((x: any) => {
        return (
          (x.instance.uniqueKey != widget.uniqueKey &&
            x.instance.widget_name == widget.widget_name) ||
          x.instance.widget_name != widget.widget_name
        );
      });
    }
  }
  public insertWidget(widgetName: string, callerContext: any): void {
    {
      var widget = null;
      switch (widgetName) {
        case 'Paragraph':
          widget = this.createWidget(ParagraphWidgetComponent, callerContext);
          break;
        case 'Button':
          widget = this.createWidget(ButtonWidgetComponent, callerContext);
          break;
        case 'Heading':
          widget = this.createWidget(HeadingWidgetComponent, callerContext);
          break;
        case 'HR':
          widget = this.createWidget(HrWidgetComponent, callerContext);
          break;
        case 'Card':
          widget = this.createWidget(CardWidgetComponent, callerContext);
          break;
        case 'Flex':
          widget = this.createWidget(FlexWidgetComponent, callerContext);
          break;
        case 'ImageCard':
          widget = this.createWidget(ImageCardWidgetComponent, callerContext);
          break;
        case 'Div':
          widget = this.createWidget(DivWidgetComponent, callerContext);
          break;
        case 'Grid':
          widget = this.createWidget(GridWidgetComponent, callerContext);
          break;
        case 'String':
          widget = this.createWidget(StringInputWidgetComponent, callerContext);
          break;
        case 'Text':
          widget = this.createWidget(TextWidgetComponent, callerContext);
          break;
        case 'Basic Input Form':
          widget = this.createWidget(FormWidgetComponent, callerContext);
          break;
        case 'Checkbox':
          widget = this.createWidget(CheckboxWidgetComponent, callerContext);
          break;
        case 'RadioButton':
          widget = this.createWidget(RadioButtonWidgetComponent, callerContext);
          break;
        case 'Date':
          widget = this.createWidget(DateWidgetComponent, callerContext);
          break;
        case 'Image':
          widget = this.createWidget(ImageWidgetComponent, callerContext);
          break;
      }
      return widget;
    }
  }
  public renderWidget(
    widget: any,
    attributes: any,
    is_editor_mode: boolean,
    callerContext: any = null,
    idMapping:any
  ) {
    if (!this.viewContainerRef) {
      throw 'View Container Ref is not defined';
    }
    var widget_object: any = this.viewContainerRef.createComponent(widget);
    widget_object.instance.parent = this.owner;
    widget.current_max_sequence++;
    widget_object.instance.is_editor_mode = is_editor_mode;
    if (callerContext) {
      widget_object.instance.setOwner(callerContext);
      callerContext.children.push(widget_object);
      callerContext.applyRule(widget_object.instance);
    } else {
      widget_object.instance.setOwner(this.owner);
      this.owner.applyRule(widget_object.instance);
      this.widgetTree.push(widget_object);
    }
    widget_object.instance.decodeJsonObject(attributes, idMapping);
    widget_object.instance.setDefault();
    this.size++;
    if (idMapping)
      idMapping[widget_object.instance.elementDomId] = widget_object
    return widget_object;
  }
  public constructWidget(
    widgetObject: any,
    callerContext: any = null,
    is_editor_mode = true,
    idMapping = null
  ) {
    var widget;
    switch (widgetObject.widgetType) {
      case 'Paragraph':
        widget = this.renderWidget(
          ParagraphWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Button':
        widget = this.renderWidget(
          ButtonWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Heading':
        widget = this.renderWidget(
          HeadingWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'HR':
        widget = this.renderWidget(
          HrWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Card':
        widget = this.renderWidget(
          CardWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Flex':
        widget = this.renderWidget(
          FlexWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'ImageCard':
        widget = this.renderWidget(
          ImageCardWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Div':
        widget = this.renderWidget(
          DivWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Grid':
        widget = this.renderWidget(
          GridWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'String':
        widget = this.renderWidget(
          StringInputWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Text':
        widget = this.renderWidget(
          TextWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Form':
        widget = this.renderWidget(
          FormWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Checkbox':
        widget = this.renderWidget(
          CheckboxWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'RadioButton':
        widget = this.renderWidget(
          RadioButtonWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Date':
        widget = this.renderWidget(
          DateWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
      case 'Image':
        widget = this.renderWidget(
          ImageWidgetComponent,
          widgetObject,
          is_editor_mode,
          callerContext,
          idMapping
        );
        break;
    }
    return widget;
  }
}
