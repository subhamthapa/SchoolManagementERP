import { BaseResource } from 'ts-json-api-formatter'

export class DataModelMetadata extends BaseResource {
  public title: string = "";
  public columnsSchemaRef = []
  public columns: any = []
  public index = null
}
