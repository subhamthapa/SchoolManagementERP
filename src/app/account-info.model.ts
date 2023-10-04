import { BaseWebsiteService } from "./base-website/base-website.service";
import { Observable } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Common } from "./common";

export class AccountInfo
{
  private static baseWebsiteInfo: any = null
  public static reset()
  {
    AccountInfo.baseWebsiteInfo = null
  }
  static getBaseWebsiteInfo(service: BaseWebsiteService)
  {
    if (AccountInfo.baseWebsiteInfo)
    {
      return new Observable((subscriber:any) =>
      {
        subscriber.next(AccountInfo.baseWebsiteInfo)
      })
    }
    else
    {
      return service.getBaseWebsiteUserDetailObservable().pipe(
        map(success=>
        {
          return AccountInfo.baseWebsiteInfo = success
        },
        shareReplay())
      )
    }
  }
}

(Common.subscribeToLogOutEvemt as any)['account'] = AccountInfo.reset
