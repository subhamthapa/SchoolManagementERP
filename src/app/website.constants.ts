export class WebAppConstants
{
    //public static api_host = "http://49.207.60.235:8000"
    public static api_host = "http://127.0.0.1:8000"
   //public static api_host = "http://192.168.0.104:8000"
    /*
      * Constants
    */
    public static renderTemplateToken = 'render-template-of-local-storage'

    /*
     * Configuration related api
    */
    public static get_website_config = WebAppConstants.api_host + "/api/website_configuration/get_website_configuration/"
    public static get_website_home_data =  WebAppConstants.api_host + "/api/home/get_website_home_config/"
    public static get_website_footer_data =  WebAppConstants.api_host + "/api/footer/get_website_footer_data/"


    /*
    * Notices related api
    */
    public static post_subscribe_to_news_letter =  WebAppConstants.api_host + "/api/notice/subscribe"

    /*
    * About tab related api
    */
    public static get_about_content = WebAppConstants.api_host + "/api/about/get_about_content"

    /*
    * Login page related api
    */
    public static get_login_thumbnail = WebAppConstants.api_host + "/api/login/get_image_thumbnail"
    //public static login = WebAppConstants.api_host + "/api/login/user_login"

    /*
    * Dashboard realted api
    */
    public static get_dashboard_config = WebAppConstants.api_host + "/api/dashboard/get-dashboard-config"

    public static set_general_config = WebAppConstants.api_host + "/api/website_configuration/set_website_configuration/"


    /*
    * Auth related api
    */
    public static login = WebAppConstants.api_host + "/api/auth/login/"
    public static refresh_token = WebAppConstants.api_host + "/api/auth/refresh-token/"

    /*
    * Config related api
    */
    public static getConfigChangeStatus = WebAppConstants.api_host + "/api/website_configuration/get-config-change-status/";
    public static uploadCarouselImage = WebAppConstants.api_host + "/api/dashboard/configure-home-page/add-carousel-image/";
    public static deleteCarouselImage = WebAppConstants.api_host + "/api/dashboard/configure-home-page/delete-carousel-image/";
    public static saveImageNote = WebAppConstants.api_host + "/api/dashboard/configure-home-page/save-image-note/";
    public static deleteImageNote = WebAppConstants.api_host + "/api/dashboard/configure-home-page/delete-image-note/";
    public static addImageNote = WebAppConstants.api_host + "/api/dashboard/configure-home-page/add-image-note/";
    public static addDemoImage = WebAppConstants.api_host + "/api/dashboard/configure-home-page/add-demo-image/";
    public static deleteDemoImage = WebAppConstants.api_host + "/api/dashboard/configure-home-page/delete-demo-image/";
    public static updateWebsiteHeader = WebAppConstants.api_host + "/api/dashboard/configure-home-page/update-website-header/";
    public static updateWebsiteConfig = WebAppConstants.api_host + "/api/dashboard/configure-home-page/update-home-page-config/";

    /*
    * Data Model related api
    */
    public static addDataModel = WebAppConstants.api_host + "/api/data-model/add_data_model/"
    public static getDataModels = WebAppConstants.api_host + "/api/data-model/get-data-models/"
    public static queryDataModels = WebAppConstants.api_host + "/api/data-model/execute-query/"

    /*
    * Dynamic App api
    */
    public static addJsonView = WebAppConstants.api_host + "/api/dynamic-app/create-json-view/"
    public static getJsonView = WebAppConstants.api_host + "/api/dynamic-app/get-json-view/"
    public static purgeJsonView = WebAppConstants.api_host + "/api/dynamic-app/purge-json-view/"
    public static getJsonViewUsingUrl = WebAppConstants.api_host + "/api/dynamic-app/get-json-view-using-url/"
    public static getRemoteImageObject = WebAppConstants.api_host + "/api/dynamic-app/get-remote-image-object/"
    public static postFormData = WebAppConstants.api_host + "/api/dynamic-app/post-form-data/"

    public static addDynamicPageOnNavbar =
          WebAppConstants.api_host + "/api/website_configuration/add-dynamic-page-url-in-navbar/"
    public static getDynamicPageOnNavbar =
          WebAppConstants.api_host + "/api/website_configuration/get-navbar-pages/"
    public static addProject = WebAppConstants.api_host + "/api/dynamic-app/create-project/"
    public static getProjects = WebAppConstants.api_host + "/api/dynamic-app/get-projects/"

    /*
    * Base website api
    */
    public static createBaseWebsiteUser = WebAppConstants.api_host + "/api/base-website-account/create-base-user/"
    public static baseWebsiteLogin = WebAppConstants.api_host + "/api/base-website-account/login/"
    public static getBaseWebsiteUserDetail = WebAppConstants.api_host + "/api/base-website-account/get-base-user-detail/"
    public static updateBaseWebsiteUserProfilePic = WebAppConstants.api_host + "/api/base-website-account/update-profile-pic/"
    public static updatePassword = WebAppConstants.api_host + "/api/base-website-account/change-password/"
    public static searchUser = WebAppConstants.api_host + "/api/base-website-account/search-user/"
    public static getPersonDetail = WebAppConstants.api_host + "/api/base-website-account/search-person-detail/"

    /*
    * Social API
    */
    public static sendConnectionRequest = WebAppConstants.api_host + "/api/social/send-connection-request/"
    public static getConnectionRequests = WebAppConstants.api_host + "/api/social/get-connection-requests/"
}


