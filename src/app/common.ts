export class Common{
  static subscribeToLogOutEvemt = {}

  static callSubscriber(subscriptions: any)
  {
    for(let subscriber in subscriptions)
    {
      subscriptions[subscriber]()
    }
  }
}
