export class Model
{
  attributes: any
  public deferred_attributes: any = {}
  constructor(attributes: any)
  {
    this.attributes = attributes
    for(var attr in attributes)
    {
      this.deferred_attributes[attr] = JSON.parse(JSON.stringify(attributes[attr]))
    }
  }
  insertIntoAttribute(attributeName: string, value: any, flags:any={}, deepCopy=false)
  {
    if (deepCopy)
    {
      this.attributes[attributeName].push(JSON.parse(JSON.stringify(value)))
      this.deferred_attributes[attributeName].push(JSON.parse(JSON.stringify(value)))
    }
    else
    {
      var object_1 = Object.assign({}, value)
      var object_2 = Object.assign({}, value)
      if(Object.keys(flags).length > 0)
      {
        for(let flag in flags)
        {
          object_1[flag] = flags[flag]
          object_2[flag] = flags[flag]
        }
      }
      this.attributes[attributeName].push(object_1)
      this.deferred_attributes[attributeName].push(object_2)
    }
  }
  insertAttributesIntoAttribute(attributeName: string, values: any, flags:any={}, deepCopy=false)
  {
    for (var key in values)
    {
      if (deepCopy)
      {
        this.attributes[attributeName].push(JSON.parse(JSON.stringify(values[key])))
        this.deferred_attributes[attributeName].push(JSON.parse(JSON.stringify(values[key])))
      }
      else
      {
        var object_1 = Object.assign({}, values[key])
        var object_2 = Object.assign({}, values[key])
        if(Object.keys(flags).length > 0)
        {
          for(let flag in flags)
          {
            object_1[flag] = flags[flag]
            object_2[flag] = flags[flag]
          }
        }
        this.attributes[attributeName].push(object_1)
        this.deferred_attributes[attributeName].push(object_2)
      }
    }
  }
  deleteFromAttribute(attributeName:string, index: number)
  {
    this.attributes[attributeName].splice(index, 1)
    this.deferred_attributes[attributeName].splice(index, 1)
  }
  insert(attributeName: string, value: any)
  {
    this.deferred_attributes[attributeName].push(value)
  }
  delete(attributeName:string, index: number)
  {
    this.deferred_attributes[attributeName].splice(index, 1)
  }
  deferApply()
  {
    for (var attr in this.deferred_attributes)
    {
      this.attributes[attr] = Object.assign({}, this.deferred_attributes[attr])
    }
  }
  deferApplyAnAttribute(attr: string, flags:any = {})
  {
    this.attributes[attr] = []
    for(let item of this.deferred_attributes[attr])
    {
      var x = Object.assign({}, item)
      if(Object.keys(flags).length > 0)
      {
        for(let flag in flags)
        {
          item[flag] = flags[flag]
          x[flag] = flags[flag]
        }
      }
      this.attributes[attr].push(x)
    }
  }
  cancelAllChanges()
  {
    for(var attr in this.deferred_attributes)
    {
      this.deferred_attributes[attr] = Object.assign({}, this.attributes[attr])
    }
  }
  cancelChange(attributeName: string)
  {
    this.deferred_attributes[attributeName] = []
    for(let item of this.attributes[attributeName])
    {
      var x = Object.assign({}, item)
      this.deferred_attributes[attributeName].push(x)
    }
  }
  replaceDefferedElement(attributeName: string, index: number, val: any)
  {
    this.deferred_attributes[attributeName][index] = Object.assign({}, val)
  }
  clearAttribute(attr:string)
  {
    this.attributes[attr] = []
    this.deferred_attributes[attr] = []
  }
  isEmpty(attribute: string) : boolean
  {
    if (this.attributes[attribute] == null)
    {
      return true
    }
    if (this.attributes[attribute] == undefined)
    {
      return true
    }
    if (typeof this.attributes[attribute] == "object" && Object.keys(this.attributes[attribute]).length == 0)
    {
      return true
    }
    return false
  }
  isDefEmpty(attribute: string) : boolean
  {
    if (this.deferred_attributes[attribute] == null)
    {
      return true
    }
    if (this.deferred_attributes[attribute] == undefined)
    {
      return true
    }
    if (typeof this.deferred_attributes[attribute] == "object" && Object.keys(this.deferred_attributes[attribute]).length == 0)
    {
      return true
    }
    return false
  }

}
