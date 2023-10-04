const platform: string = 'SAI_GRACE_ACADEMY';
const isOnPrem = false;
export class Utilities {
  public static getPlatform(): string {
    if (!isOnPrem) {
      var platform_ = window.location.href.split('project')[1].split('/')[1];
      return platform_;
    }
    if (platform) {
      return platform;
    } else {
      throw new TypeError('Platform id is not set');
    }
    return '';
  }
  public static getWebsiteHomePageUrl(): string {
    return '/project/' + Utilities.getPlatform() + '/webapp';
  }
  public static getWebsitebaseUrl(): string {
    return '/project/' + Utilities.getPlatform();
  }
}
