export class Grid {
  gridColumns: any = {};
  public defferedColumns: any = {};
  deletedColumns: any = [];
  noOfColumns: number = 0;

  public constructor(noOfColumns: number) {
    this.noOfColumns = noOfColumns;
    for (let i = 0; i < noOfColumns; i++) {
      this.gridColumns[i] = [];
    }
    this.deepCopy(this.defferedColumns, this.gridColumns);
  }

  private deepCopy(object_a: any, object_b: any) {
    let keys = Object.keys(object_b);
    for (let i = 0; i < keys.length; i++) {
      object_a[keys[i]] = [];
      for (let item of object_b[keys[i]]) {
        object_a[keys[i]].push(Object.assign({}, item));
      }
    }
  }

  public disableAll() {
    let keys = Object.keys(this.defferedColumns);
    for (let i = 0; i < keys.length; i++) {
      for (var media of this.defferedColumns[keys[i]]) {
        media.disabled = true;
      }
    }
  }
  public cancelEdit(column: number, index: number) {
    this.defferedColumns[column][index] = Object.assign(
      this.gridColumns[column][index]
    );
  }
  public resetDefferedChanges() {
    this.defferedColumns = {};
    for (let i = 0; i < this.noOfColumns; i++) {
      this.defferedColumns[i] = [];
    }
    this.deletedColumns = [];
  }
  private resetGrid() {
    this.gridColumns = {};
    for (let i = 0; i < this.noOfColumns; i++) {
      this.gridColumns[i] = [];
    }
    this.deletedColumns = [];
  }
  private setGridItems(data: any, flags: any, grid: any) {
    for (var i = 0; i < data.length; i++) {
      var index = i % this.noOfColumns;
      for (var key in flags) {
        data[i][key] = flags[key];
      }
      console.log(data);
      grid[index].push(data[i]);
    }
  }
  public refreshGrid(data: any, flags: any) {
    this.resetDefferedChanges();
    this.setGridItems(data, flags, this.gridColumns);
    this.deepCopy(this.defferedColumns, this.gridColumns);
  }
  public updateAndApplyIntoGrid(data: any, flags: any) {
    this.resetDefferedChanges();
    this.resetGrid();
    this.setGridItems(data, flags, this.defferedColumns);
    this.deepCopy(this.gridColumns, this.defferedColumns);
  }

  public addIntoGrid(data: any) {
    var lenthOfFirstColum = this.defferedColumns[0].length;
    var lengthOfDefferedColumn = Object.keys(this.defferedColumns).length;
    //We interate through the deffered columns if the length of the column is equal to lenthOfFirstColum.
    //We stop where the length of the column is not equal to lenthOfFirstColum
    for (
      var i = 0;
      i < lengthOfDefferedColumn &&
      this.defferedColumns[i].length == lenthOfFirstColum;
      i++
    ) {}
    if (i == lengthOfDefferedColumn) {
      //New element must be inserted in the first column
      this.defferedColumns[0].push(data);
    } else {
      //I is the correct column where we want to insert
      this.defferedColumns[i].push(data);
    }
  }
  public deleteFromGrid(col: number, index: number): void {
    this.deletedColumns.push(this.defferedColumns[col][index].id);
    this.defferedColumns[col].splice(index, 1);
  }
  public restoreColumns(): void {
    this.deepCopy(this.defferedColumns, this.gridColumns);
  }

  public getDefferedColumns() {
    return this.defferedColumns;
  }

  public appyAttributeToAllRows(attributes: any) {
    for (var col of Object.keys(this.defferedColumns)) {
      for (var item of this.defferedColumns[col]) {
        for (var attribute in attributes) {
          item[attribute] = attributes[attribute];
        }
      }
    }
  }
  public resetDefferedItem(column: number, index: number) {
    this.defferedColumns[column][index] = Object.apply(
      this.gridColumns[column][index]
    );
  }
  public applyChanges() {
    this.deepCopy(this.gridColumns, this.defferedColumns);
  }
  public reShuffleGrid() {
    let all: any = [];
    for (let col in this.defferedColumns) {
      for (let item of this.defferedColumns[col]) {
        all.push(Object.assign({}, item));
      }
    }
    this.resetGrid();
    this.refreshGrid(all, {});
  }
  public isDefEmpty() {
    var noOfEmpty = 0;
    for (let key in this.defferedColumns) {
      if (this.defferedColumns[key].length == 0) {
        noOfEmpty++;
      }
    }
    if (noOfEmpty == Object.keys(this.defferedColumns).length) {
      return true;
    }
    return false;
  }
  public isEmpty() {
    var noOfEmpty = 0;
    for (let key in this.gridColumns) {
      if (this.gridColumns[key].length == 0) {
        noOfEmpty++;
      }
    }
    if (noOfEmpty == Object.keys(this.gridColumns).length) {
      return true;
    }
    return false;
  }
  public serializeIntoOneArray() {
    var serialized = [];
    var i = 0;
    var j = 0;
    var keys = Object.keys(this.gridColumns);
    var done = 0;
    while (true) {
      if (done == keys.length) {
        break;
      }
      if (j >= this.gridColumns[keys[i % this.noOfColumns]].length) {
        done++;
        i++;
        if (i % this.noOfColumns == 0) {
          j++;
        }
        continue;
      }
      serialized.push(this.gridColumns[keys[i % this.noOfColumns]][j]);
      if ((i + 1) % this.noOfColumns == 0) {
        j++;
      }
      i++;
    }
    return serialized;
  }
}
