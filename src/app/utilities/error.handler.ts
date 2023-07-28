export class ErrorHandler {
  static getErrorTxt(error: any) {
    console.log(error);
    if (error.error.hasOwnProperty('detail')) var message = error.error.detail;
    else if (error.error.hasOwnProperty('error'))
      var message = error.error.error;
    return message;
  }
}
