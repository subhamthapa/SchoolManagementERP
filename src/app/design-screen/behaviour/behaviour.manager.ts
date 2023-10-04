import { DataModelManagerService } from 'src/app/data-model-manager/data-model-manager.service';
import { Widget } from '../widgets/widget';

export class Behaviour {
  static readonly events = {
    submit: 'onsubmit',
    click: 'onclick',
    onLoad: 'onload'
  };
  static readonly actions:any = {
    hide: Behaviour.hideElement,
    toggleHidden: Behaviour.toggleDisplay,
    changeColor: Behaviour.changeColor,
    applyCssOnTarget: Behaviour.applyCssOnTarget,
    setValueUsingDataModel: Behaviour.setValueUsingDataModel
  };
  triggerEvent = '';
  triggerAction = '';
  jsonDecoder = null;
  data: any = {
    targetElementId: '',
  };
  dataModelService: DataModelManagerService | null = null
  applyJsonData(json: any) {
    this.triggerEvent = json.triggerEvent;
    this.triggerAction = json.triggerAction;
    this.data = json.data;
  }
  public static hideElement(behavior: Behaviour, decoder: any) {
    var element =
      decoder.widgetObjectIdMapping[behavior.data['targetElementId']];
    element.instance.default_css['display'] = 'none';
  }
  public static toggleDisplay(behavior: Behaviour, decoder: any) {
    var element =
      decoder.widgetObjectIdMapping[behavior.data['targetElementId']];
    element.instance.hidden = !element.instance.hidden;
  }
  public static changeColor(behaviour: Behaviour, decoder: any)
  {
    var element =
      decoder.widgetObjectIdMapping[behaviour.data['targetElementId']];
    element.instance.default_css['color'] = behaviour.data[1]['value']
  }
  public static applyCssOnTarget(behaviour: Behaviour, decoder: any)
  {
    var element =
      decoder.widgetObjectIdMapping[behaviour.data['targetElementId']];
    element.instance.customStyle = behaviour.data[1]['value']
  }
  public static setValueUsingDataModel(behaviour: Behaviour, decoder: any)
  {
    var element =
      decoder.widgetObjectIdMapping[behaviour.data['targetElementId']];
    var value = behaviour.data[1]['value']
    var tokens  = value.split("->")
    var query = {
      "query": "selectColumn",
      "dataModel": tokens[0],
      "columns": [tokens[1]],
      "count": 1
    }
    if (behaviour.dataModelService)
    {
      behaviour.dataModelService.postQueryObservable(query).subscribe(
        (success:any)=>
        {
          element.instance.value = success['data'][0][0]
        },
        error=>
        {

        }
      )
    }
  }
}
