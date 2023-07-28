import { Button } from '../ui-builder';

export class Attributes {
  public elementName: string = '';
  public id: string = '';
  public value: string = '';
  public fontSize: number = 12;
  public color: string = 'black';
  public customStyle = '';
  public bootstrapColorScheme: string = 'primary';

  public setAttributes(object: any) {
    this.value = object.value;
    $('#attributeValue').unbind();
    $('#attributeValue').on('change', () => {
      object.value = this.value;
      object.apply();
    });
    $('#attributeFontSize').unbind();
    $('#attributeFontSize').on('input', () => {
      object.css['font-size'] = '' + this.fontSize + 'px';
      object.apply();
    });
    $('#attributeColor').unbind();
    $('#attributeColor').on('input', () => {
      object.css['color'] = this.color;
      object.apply();
    });
    if (object.constructor.name == 'Button') {
      $('#attributeBootstrapColorScheme').unbind();
      $('#attributeBootstrapColorScheme').on('change', () => {
        console.log("HELLO")
        object.bootstrapPrevBtnClass = object.bootstrapBtnClass;
        object.bootstrapBtnClass = 'btn-' + this.bootstrapColorScheme;
        object.apply();
      });
    }
  }
}
