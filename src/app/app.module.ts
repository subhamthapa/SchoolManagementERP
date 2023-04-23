import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WebsiteHomeComponent } from './website-home/website-home.component';
import { WebsiteNavbarComponent } from './website-navbar/website-navbar.component';

import { ConfigService } from './config.service';
import { HomeDataService } from './home/data-service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebsiteFooterComponent } from './website-footer/website-footer.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'
import { MatSidenavModule } from '@angular/material/sidenav'
import { DashboardComponent } from './dashboard/dashboard.component'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService, AuthInterceptor, AuthGuard } from './auth-service';
import { DashboardSideNavComponent } from './dashboard-side-nav/dashboard-side-nav.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebsiteConfigComponent } from './website-config/website-config.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { GeneralConfigComponent } from './general-config/general-config.component';



function init()
{
  let url = window.location.href
  try
  {
    let param = url.split("?")[1].split('&')
    let platform = null
    for(let p of param)
    {
      console.log("Hello",p)
      if(p.indexOf("webapp_platform")> -1)
      {
          platform = p.split("=")[1]
      }
    }
    console.log(platform)
    if (platform)
    {
      if(localStorage.getItem("platform") && localStorage.getItem("platform") != platform)
      {
          localStorage.clear()
      }
      localStorage.setItem("platform", platform)
    }
  }
  catch(Exception)
  {
    console.log(Exception)
  }
}


@NgModule({
  declarations: [
    AppComponent,
    WebsiteHomeComponent,
    WebsiteNavbarComponent,
    HomeComponent,
    AboutComponent,
    WebsiteFooterComponent,
    LoginComponent,
    DashboardComponent,
    DashboardSideNavComponent,
    WebsiteConfigComponent,
    EditHomeComponent,
    GeneralConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => init,
    //   multi: true
    // }
    //,
    ConfigService,
    HomeDataService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
