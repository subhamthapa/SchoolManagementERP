import { WidgetManager } from "../widgets/widgets.manager";

export class JsonEncoder
{
  jsonObject: any = []
  constructor(private widgetManager: WidgetManager)
  {}

  public encode()
  {
    this.jsonObject = []
    for (var element of this.widgetManager.widgetTree)
    {
      this.jsonObject.push(element.instance)
    }
  }
  public append(element: any)
  {
    this.jsonObject.push(element.instance)
  }
  public getJsonString()
  {
    var objList_ = []
    for (var element of this.jsonObject)
    {
      objList_.push(element.encodeJsonObject())
    }
    return JSON.stringify(objList_)
  }
  public getJsonObject(render = false)
  {
    var objList_ = []
    for (var element of this.jsonObject)
    {
      objList_.push(element.encodeJsonObject(render))
    }
    return objList_
  }
  public storeJsonString()
  {
    var json = this.getJsonString()
    localStorage.setItem("jsonView", json)
    return json
  }
  public storeBackupJsonString(json:any = null)
  {
    if(!json)
    {
      json = this.getJsonString()
    }
    localStorage.setItem("jsonViewBackup", json)
  }
  public setJsonObject(jsonObject: any)
  {
    this.jsonObject = jsonObject
  }
  public clear()
  {
    this.jsonObject = []
  }
}
