import { Button } from '../ui-builder';
import { Widget } from '../widgets/widget';

export class Attributes {
  public elementName: string = '';
  public id: string = '';
  public value: string = '';
  public fontSize: string = '12';
  public color: string = 'black';
  public customStyle = '';
  public bootstrapColorScheme: string = 'primary';
  public context: any = null;
  public padding: any = '0';
  public paddingLeft = '0';
  public paddingRight = '0';
  public paddingTop = '0';
  public paddingBottom = '0';
  public margin: any = '0';
  public marginLeft = '0';
  public marginRight = '0';
  public marginTop = '0';
  public marginBottom = '0';
  public width = '';
  public height = '';
  public shadow = ""
  customAttributes = {}

  private stripPx(value: string)
  {
    if (value && value.substring(value.length - 2) == "px")
    {
      return value.substring(0, value.length - 2)
    }
    return value
  }
  public setAttributes(object: Widget) {
    this.context = object;
    this.value = object.value;
    this.id = object.elementDomId;
    this.elementName = object.elementName;
    this.padding = this.stripPx(object.default_css['padding']) || '';
    this.paddingLeft = this.stripPx(object.default_css['padding-left']) || '';
    this.paddingRight = this.stripPx(object.default_css['padding-right']) || '';
    this.margin = this.stripPx(object.default_css['margin']) || '';
    this.marginLeft = this.stripPx(object.default_css['margin-left']) || '';
    this.marginRight = this.stripPx(object.default_css['margin-right']) || '';
    this.width =  this.stripPx(object.default_css['width']) || '';
    this.height =  this.stripPx(object.default_css['height']) || '';
    this.shadow = object.shadow_class;
    this.customStyle = object.customStyle
    this.fontSize = this.stripPx(object.default_css['font-size']) || ""
    this.customAttributes = object.customAttributes()
  }
  public applyChange(event: string) {
    if (!this.context) return;
    this.context.value = this.value;
    this.context.updateValues(this, event);
  }
}
