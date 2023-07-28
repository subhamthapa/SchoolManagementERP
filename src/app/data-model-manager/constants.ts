export class Constants {
  public static dataTypes = [
    'int',
    'tinyString',
    'smallString',
    'mediumString',
    'float',
  ];
  public static queryTypes = ['JSON', 'Data Model Query'];
  public static queries = [
    'selectColumn',
    'insertInto',
    'alterDataModelDropColumn',
    'alterDataModelAddColumn',
    'dropDataModel',
    'updateDataModel',
    'deleteRowFromDataModel',
  ];
  public static defaultSelectQuery = {
    query: 'selectColumn',
    dataModel: '',
    columns:[],
    count: [],
  };
  public static defaulInsertQuery = {
    query: 'insertInto',
    dataModel: '',
    data: []
  };
  public static alterDataModelDropColumn = {
    query: 'alterDataModelDropColumn',
    dataModel: '',
    column: [],
  };
  public static alterDataModelAddColumn = {
    query: 'alterDataModelAddColumn',
    dataModel: '',
    columns: [
      {
        columnName: '',
        columnType: '',
        default: '',
        index: '',
      },
    ],
  };
  public static dropQuery = {
    query: 'dropDataModel',
    dataModel: '',
    consent: false
  };
  public static updateQuery = {
    query: 'updateDataModel',
    dataModel: '',
    set: {},
    where: {},
    count: [],
  };
  public static deleteRowQuery = {
    query: 'deleteRowFromDataModel',
    dataModel: '',
    where: {},
    count: [],
  };
  public static getJsonQuery(queryName: string, dataModel: any) {
    var query: any = {};
    switch (queryName) {
      case 'selectColumn':
        query = Constants.defaultSelectQuery;
        query['dataModel'] = dataModel.name;
        break;
      case 'insertInto':
        query = Constants.defaulInsertQuery;
        query['dataModel'] = dataModel.name;
        break;
      case 'alterDataModelDropColumn':
        query = Constants.alterDataModelDropColumn;
        query['dataModel'] = dataModel.name;
        break;
      case 'alterDataModelAddColumn':
        query = Constants.alterDataModelAddColumn;
        query['dataModel'] = dataModel.name;
        break;
      case 'dropDataModel':
        query = Constants.dropQuery;
        query['dataModel'] = dataModel.name;
        break;
      case 'updateDataModel':
        query = Constants.updateQuery;
        query['dataModel'] = dataModel.name;
        break;
      case 'deleteRowFromDataModel':
        query = Constants.deleteRowQuery;
        query['dataModel'] = dataModel.name;
        break;
    }
    return query;
  }
}
