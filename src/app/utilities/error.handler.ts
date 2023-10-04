export class ErrorHandler {
  static getErrorTxt(error: any) {
    if (error.error.hasOwnProperty('detail')) var message = error.error.detail;
    else if (error.error.hasOwnProperty('error'))
      var message = error.error.error;
    else if(error.status == 0)
    {
      message =  error.statusText;
      if (error.message)
      {
        message += "  " + error.message;
      }
    }
    return message;
  }
}
