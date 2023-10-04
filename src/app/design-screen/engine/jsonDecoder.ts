import { WidgetManager } from "../widgets/widgets.manager";

export class JsonDecoder
{
  widgetObjectIdMapping: any = {}
  constructor(private widgetManager: WidgetManager)
  {}
  public decode(jsonString: string, context=null, is_editor_mode=true)
  {
    var jsonObject = JSON.parse(jsonString)
    for (var element of jsonObject)
    {
      this.widgetManager.constructWidget(element, context, is_editor_mode, this.widgetObjectIdMapping)
    }
    return jsonObject
  }
  public decodeDeployed(jsonObject:any, context=null, is_editor_mode=true)
  {
    for (var element of jsonObject)
    {
      this.widgetManager.constructWidget(element, context, is_editor_mode)
    }
    return jsonObject
  }
  public loadJSONPage(jsonString: string)
  {
    this.widgetManager.clearScreen()
    this.decode(jsonString)

  }
}
