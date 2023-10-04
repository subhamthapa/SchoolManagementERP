import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WebsiteHomeComponent } from './website-home/website-home.component';
import { AuthGuard } from './auth-service';
import { WebsiteConfigComponent } from './website-config/website-config.component';
import { HomePageConfigComponent } from './home-page-config/home-page-config.component';
import { GeneralConfigComponent } from './general-config/general-config.component';
import { DesignScreenComponent } from './design-screen/design-screen.component';
import { DataModelManagerComponent } from './data-model-manager/data-model-manager.component';
import { DesignScreenAppRoutes } from './design-screen/routing';
import { JsonViewRendererComponent } from './json-view-renderer/json-view-renderer.component';
import { BaseWebsiteComponent } from './base-website/base-website.component';
import { BaseWebsiteHomeComponent } from './base-website-home/base-website-home.component';
import { BaseWebsiteLoginComponent } from './base-website-login/base-website-login.component';
import { BaseWebsiteSignUpComponent } from './base-website-sign-up/base-website-sign-up.component';
import { BaseWebsiteDashboardComponent } from './base-website-dashboard/base-website-dashboard.component';
import { BaseWebsiteOverviewComponent } from './base-website-overview/base-website-overview.component';
import { SocialComponent } from './social/social.component';
import { AccountComponent } from './account/account.component';
import { AccountInfoComponent } from './social/account-info/account-info.component';
import { BaseWebsiteNotificationComponent } from './base-website-notification/base-website-notification.component';

const routes:any = [
  {
    path: '',
    component: BaseWebsiteComponent,
    children: [
      {
        path: '',
        component: BaseWebsiteHomeComponent
      }
      ,
      {
        path: 'login',
        component: BaseWebsiteLoginComponent
      }
      ,
      {
        path: 'signup',
        component: BaseWebsiteSignUpComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: BaseWebsiteDashboardComponent,
    children:[
      {
        path: '',
        component: BaseWebsiteOverviewComponent,
        canActivate: [AuthGuard]
      }
      ,
      {
        path: 'social',
        component: SocialComponent,
        children:[
          {
            path: 'account',
            component: AccountInfoComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
      ,
      {
        path: 'account',
        component: AccountComponent
      }
      ,
      {
        path: 'notifications',
        component: BaseWebsiteNotificationComponent
      }


    ]
  }
  ,
  {
    path: 'project/:platform/webapp',
    component: WebsiteHomeComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'render/:url',
        component: JsonViewRendererComponent,
        children: [
          {
            path: '**',
            component: JsonViewRendererComponent,
          },
        ],
      }
    ],
  },
  {
    path: 'project/:platform/render/:url',
    component: JsonViewRendererComponent,
    children: [
      {
        path: '**',
        component: JsonViewRendererComponent,
      },
    ],
  },
  {
    path: 'project/:platform/dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'website-config',
        component: WebsiteConfigComponent,
        children: [
          {
            path: 'general-config',
            component: GeneralConfigComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'home-page-config',
            component: HomePageConfigComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'render/:url',
    component: JsonViewRendererComponent,
    children: [
      {
        path: '**',
        component: JsonViewRendererComponent,
      },
    ],
  }
];
routes.push(DesignScreenAppRoutes.routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
