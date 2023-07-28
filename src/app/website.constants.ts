export class WebAppConstants
{
    public static api_host = "http://localhost:8000"

    /*
      * Constants
    */

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

    public static getConfigChangeStatus = WebAppConstants.api_host + "/api/website_configuration/get-config-change-status/";
    public static uploadCarouselImage = WebAppConstants.api_host + "/api/dashboard/configure-home-page/add-carousel-image/";
    public static deleteCarouselImage = WebAppConstants.api_host + "/api/dashboard/configure-home-page/delete-carousel-image/";
    public static saveImageNote = WebAppConstants.api_host + "/api/dashboard/configure-home-page/save-image-note/";
    public static deleteImageNote = WebAppConstants.api_host + "/api/dashboard/configure-home-page/delete-image-note/";
    public static addImageNote = WebAppConstants.api_host + "/api/dashboard/configure-home-page/add-image-note/";
    public static addDemoImage = WebAppConstants.api_host + "/api/dashboard/configure-home-page/add-demo-image/";
    public static deleteDemoImage = WebAppConstants.api_host + "/api/dashboard/configure-home-page/delete-demo-image/";

    /*
    * Data Model related api
    */
    public static addDataModel = WebAppConstants.api_host + "/api/data-model/add_data_model/"
    public static getDataModels = WebAppConstants.api_host + "/api/data-model/get-data-models/"
    public static queryDataModels = WebAppConstants.api_host + "/api/data-model/execute-query/"
}


