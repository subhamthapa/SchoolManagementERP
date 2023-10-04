import { PipeLine } from '../behaviour/behaviour.component';
import { Behaviour } from '../behaviour/behaviour.manager';
import { CreateViewComponent } from '../create-view/create-view.component';
import { WidgetManager } from './widgets.manager';
import { Component } from '@angular/core';

@Component({
  template: '',
})
export abstract class Widget {
  public uniqueKey = 0;
  public root: any = null;
  public widget_name = '';
  children: any[] = [];
  behaviour: any = [];
  is_editor_mode = true;
  value = '';
  static current_max_sequence = 0;
  public elementDomId = '';
  public elementName = '';
  public default_css: any = {
    'font-size': '12px',
  };
  public owner: any = null;
  public base_class = '';
  public widget_class = '';
  public root_class = '';
  public other_editor_class = ' ';
  public host_class = '';
  public shadow_class = '';
  public customStyle = '';
  public attributes = {};
  parent: any = null;
  flag = false;
  signal_flag = false;
  is_container = false;
  is_input_type = false;
  hidden: boolean = false;
  classList: any = [];
  actions = {
    click: () => {},
  };

  constructor() {
    this.widget_name = 'widget';
  }
  ngOnInit() {
    //this.registerBehaviour();
  }
  ngAfterViewInit() {
    this.registerBehaviour();
  }

  setOwner(owner: any) {
    this.owner = owner;
  }

  public signalParent() {
    if (!this.is_editor_mode) {
      return true;
    }
    if (this.signal_flag) {
      this.signal_flag = false;
      return true;
    }
    this.owner.signal(this);
    return true;
  }
  signal(obj: any) {
    this.signal_flag = true;
    this.owner.signal(obj);
  }
  setClass() {
    this.base_class = this.is_editor_mode
      ? 'editor-component ' +
        this.other_editor_class +
        this.widget_class +
        this.root_class +
        this.shadow_class
      : this.widget_class + this.shadow_class;
    this.base_class += this.classList.join(' ');
  }
  public setDefault() {
    this.elementDomId = this.widget_name + '__' + this.uniqueKey;
    this.elementName = this.widget_name + this.uniqueKey;
    this.setClass();
  }

  public setDomId(id: string) {
    this.elementDomId = id;
  }
  public encodeJsonObject(render = false): any {
    var obj = {
      widgetType: this.widget_name,
      id: this.elementDomId,
      name: this.elementName,
      css: this.default_css,
      value: this.value,
      children: new Array<Widget>(),
      uniqueKey: this.uniqueKey,
      shadow: this.shadow_class,
      customStyle: this.customStyle,
      host_class: this.host_class,
      classList: this.classList,
      attributes: this.attributes,
      behaviour: this.behaviour,
    };
    for (var child of this.children) {
      obj.children.push(child.instance.encodeJsonObject(render));
    }
    return obj;
  }
  bindEvents(behavior: Behaviour) {
    switch (behavior.triggerEvent) {
      case 'click':
        var prev = this.actions['click']
        this.actions['click'] = () => {
          prev()
          var mapping = Behaviour.actions[behavior.triggerAction];
          mapping(behavior, this.parent.jsonDecoder);
        };
        break;
      case 'onLoad':
        if(!this.is_editor_mode)
        {
          var mapping = Behaviour.actions[behavior.triggerAction]
          behavior.dataModelService =  this.parent.dataModelService
          mapping(behavior, this.parent.jsonDecoder)
        }
        break;
    }
  }
  registerBehaviour() {
    if (this.is_editor_mode) {
      return;
    }
    for (let pipleline of this.behaviour) {
      pipleline.bindBehaviour(this);
    }
  }
  public decodeJsonObject(jsonObject: any, idMapping: any=null) {
    if (this.widget_name != jsonObject['widgetType']) {
      throw 'Invalid widget object';
    }
    this.setDefault();
    this.elementDomId = jsonObject['id'];
    this.elementName = jsonObject['name'];
    this.default_css = jsonObject['css'];
    this.value = jsonObject['value'];
    this.uniqueKey = jsonObject['uniqueKey'];
    this.shadow_class = jsonObject['shadow'] || '';
    this.customStyle = jsonObject['customStyle'] || '';
    var widgetMgr = WidgetManager.getRendererSubscriber();
    this.host_class = jsonObject['host_class'];
    this.classList = jsonObject['classList'] || [];
    for (let x of jsonObject['behaviour'] || []) {
      let pipeLine = new PipeLine(-1);
      pipeLine.setUsingJsonObject(x);
      this.behaviour.push(pipeLine);
    }
    this.updateAttributes(jsonObject);
    for (let val of jsonObject['children']) {
      widgetMgr.setRoot(this.getRoot());
      widgetMgr.constructWidget(val, this, this.is_editor_mode, idMapping);
    }
    widgetMgr.resetRoot();
    if(idMapping)
      idMapping[this.elementDomId] = this;
    return this;
  }

  updateAttributes(jsonObject: any) {
    this.attributes = jsonObject['attributes'];
  }

  updateValues(object: any, event: string): void {
    switch (event) {
      case 'value':
        this.value = object.value;
        break;
      case 'FontSize':
        if (object.fontSize.trim() == '' || object.width.trim() == '-') {
          delete this.default_css['font-size'];
          break;
        }
        this.default_css['font-size'] = object.fontSize + 'px';
        break;
      case 'Color':
        if (object.color.trim() == '' || object.color.trim() == '-') {
          delete this.default_css['color'];
          break;
        }
        this.default_css['color'] = object.color;
        break;
      case 'Padding':
        if (object.padding.trim() == '' || object.padding.trim() == '-') {
          delete this.default_css['padding'];
          break;
        }
        this.default_css['padding'] = object.padding + 'px';
        break;
      case 'Margin':
        if (object.margin.trim() == '' || object.margin.trim() == '-') {
          delete this.default_css['margin'];
          break;
        }
        this.default_css['margin'] = object.margin + 'px';
        break;
      case 'PaddingLeft':
        if (
          object.paddingLeft.trim() == '' ||
          object.paddingLeft.trim() == '-'
        ) {
          delete this.default_css['padding-left'];
          break;
        }
        this.default_css['padding-left'] = object.paddingLeft + 'px';
        break;
      case 'PaddingRight':
        if (
          object.paddingRight.trim() == '' ||
          object.paddingRight.trim() == '-'
        ) {
          delete this.default_css['padding-right'];
          break;
        }
        this.default_css['padding-right'] = object.paddingRight + 'px';
        break;
      case 'PaddingTop':
        if (object.paddingTop.trim() == '' || object.paddingTop.trim() == '-') {
          delete this.default_css['padding-top'];
          break;
        }
        this.default_css['padding-top'] = object.paddingTop + 'px';
        break;
      case 'PaddingBottom':
        if (
          object.paddingBottom.trim() == '' ||
          object.paddingBottom.trim() == '-'
        ) {
          delete this.default_css['padding-bottom'];
          break;
        }
        this.default_css['padding-bottom'] = object.paddingBottom + 'px';
        break;
      case 'MarginLeft':
        if (object.marginLeft.trim() == '' || object.marginLeft.trim() == '-') {
          delete this.default_css['margin-left'];
          break;
        }
        this.default_css['margin-left'] = object.marginLeft + 'px';
        break;
      case 'MarginRight':
        if (
          object.marginRight.trim() == '' ||
          object.marginRight.trim() == '-'
        ) {
          delete this.default_css['margin-right'];
          break;
        }
        this.default_css['margin-right'] = object.marginRight + 'px';
        break;
      case 'MarginTop':
        if (object.marginTop.trim() == '' || object.marginTop.trim() == '-') {
          delete this.default_css['margin-top'];
          break;
        }
        this.default_css['margin-top'] = object.marginTop + 'px';
        break;
      case 'MarginBottom':
        if (
          object.marginBottom.trim() == '' ||
          object.marginBottom.trim() == '-'
        ) {
          delete this.default_css['margin-bottom'];
          break;
        }
        this.default_css['margin-bottom'] = object.marginBottom + 'px';
        break;
      case 'Width':
        if (object.width.trim() == '' || object.width.trim() == '-') {
          delete this.default_css['width'];
          break;
        }
        this.default_css['width'] = object.width + 'px';
        break;
      case 'Height':
        if (object.height.trim() == '' || object.height.trim() == '-') {
          delete this.default_css['height'];
          break;
        }
        this.default_css['height'] = object.height + 'px';
        break;
      case 'Shadow':
        this.shadow_class = object.shadow;
        break;
      case 'style':
        for (let style in this.default_css) {
          if (object.customStyle.indexOf(style + ':') != -1) {
            delete this.default_css[style];
            switch (style) {
              case 'color':
                object.color = '';
                break;
            }
          }
        }
        this.customStyle = object.customStyle;
        break;
    }
  }
  contextMenu($event: any) {
    if (!this.is_editor_mode) {
      return true;
    }
    if (!this.owner) {
      throw 'Parent undefined';
    }
    if (this.flag) {
      this.flag = false;
      return;
    }
    this.owner.openMenu($event, this);
    return false;
  }
  openMenu($event: any, context: any) {
    this.flag = true;
    if (!this.owner) {
      throw 'Parent undefined';
    }
    this.owner.openMenu($event, context);
    return false;
  }
  getRoot(): any {
    return null;
  }
  setRootCss() {
    this.root_class = ' root-renderer ';
    this.setDefault();
    this.owner.applyRule(this);
  }
  unsetRootCss() {
    this.root_class = '';
    this.setDefault();
    this.owner.applyRule(this);
  }
  customAttributes(): any {
    return this.attributes;
  }
  applyRule(element: any) {}
  signalChanged($event: any) {}
  afterDecodeUpdateAttributes(attribute: any) {}
  signalChildrenDeleted() {}
  getAncestor(widgetName: string) {
    if (this.widget_name == widgetName) {
      return this;
    }
    if (this.widget_name == 'base_view') {
      return null;
    }
    if (!this.owner) {
      return null;
    }
    return this.owner.getAncestor(widgetName);
  }
  getValue(data: any) {
    data[this.elementDomId] = this.value;
  }
  applyBehaviour() {
    this.parent.signalToStoreWidgets('Set Behavior');
  }
}
