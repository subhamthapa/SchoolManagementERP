import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WebsiteHomeComponent } from './website-home/website-home.component';
import { AuthGuard } from './auth-service';
import { WebsiteConfigComponent } from './website-config/website-config.component';
import { HomePageConfigComponent } from './home-page-config/home-page-config.component'
import { GeneralConfigComponent } from './general-config/general-config.component';
import { DesignScreenComponent } from './design-screen/design-screen.component';
import { DataModelManagerComponent } from './data-model-manager/data-model-manager.component';
import { DesignScreenAppRoutes  } from './design-screen/routing'

const routes: Routes = [
  {
    path: '',
    component:WebsiteHomeComponent,
    children: [
      {
        path: '',
        component:HomeComponent
      },
      {
        path: 'about',
        component:AboutComponent
      }
      ,
      {
        path: 'login',
        component:LoginComponent
      }
    ]
  }
  ,
  {
    path: 'dashboard',
    component:DashboardComponent,
    children: [
      {
        path: 'website-config',
        component: WebsiteConfigComponent,
        children: [
          {
            path: 'general-config',
            component: GeneralConfigComponent,
            canActivate: [AuthGuard]
          }
          ,
          {
            path: 'home-page-config',
            component: HomePageConfigComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ],
    canActivate: [AuthGuard]
  }
];
routes.push(DesignScreenAppRoutes.routes)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
