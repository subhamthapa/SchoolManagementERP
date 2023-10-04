import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService, AuthInterceptor, AuthGuard } from './auth-service';
import { DashboardSideNavComponent } from './dashboard-side-nav/dashboard-side-nav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebsiteConfigComponent } from './website-config/website-config.component';
import { GeneralConfigComponent } from './general-config/general-config.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfigPagesComponent } from './config-pages/config-pages.component';
import { HomePageConfigComponent } from './home-page-config/home-page-config.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DesignScreenComponent } from './design-screen/design-screen.component';
import { DataModelManagerComponent } from './data-model-manager/data-model-manager.component';
import { AddModel } from './data-model-manager/add-model.sub.component';
import { QueryViewComponent } from './data-model-manager/query-view/query-view.component';
import { CreateViewComponent } from './design-screen/create-view/create-view.component';
import { AttributeViewComponent } from './design-screen/create-view/attribute-view/attribute-view.component';
import { design_screen_declarations } from './design-screen/module';
import { WidgetDirective } from './design-screen/widgets/directive';
import { CodeEditorComponent } from './design-screen/code-editor/code-editor.component';
import { RendererDirective } from './json-view-renderer/directive';
import { JsonViewRendererComponent } from './json-view-renderer/json-view-renderer.component';
import { BaseWebsiteNavbarComponent } from './base-website-navbar/base-website-navbar.component';
import { BaseWebsiteComponent } from './base-website/base-website.component';
import { DivWidgetComponent } from './design-screen/widgets/div-widget.component';
import { BaseWebsiteHomeComponent } from './base-website-home/base-website-home.component';
import { BaseWebsiteLoginComponent } from './base-website-login/base-website-login.component';
import { BaseWebsiteSignUpComponent } from './base-website-sign-up/base-website-sign-up.component';
import { BaseWebsiteDashboardComponent } from './base-website-dashboard/base-website-dashboard.component';
import { BaseWebsiteOverviewComponent } from './base-website-overview/base-website-overview.component';
import { CreateProjectComponent } from './baseWebsiteOverview/create-project/create-project.component';
import { SocialComponent } from './social/social.component';
import { AccountComponent } from './account/account.component';
import { AccountInfo } from './account-info.model';
import { AccountInfoComponent } from './social/account-info/account-info.component';
import { BaseWebsiteNotificationComponent } from './base-website-notification/base-website-notification.component';

function init() {
  let url = window.location.href;
  try {
    let param = url.split('?')[1].split('&');
    let platform = null;
    for (let p of param) {
      console.log('Hello', p);
      if (p.indexOf('webapp_platform') > -1) {
        platform = p.split('=')[1];
      }
    }
    console.log(platform);
    if (platform) {
      if (
        localStorage.getItem('platform') &&
        localStorage.getItem('platform') != platform
      ) {
        localStorage.clear();
      }
      localStorage.setItem('platform', platform);
    }
  } catch (Exception) {
    console.log(Exception);
  }
}
var declarations = [
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
  GeneralConfigComponent,
  LoadingComponent,
  ConfigPagesComponent,
  HomePageConfigComponent,
  DialogComponent,
  DesignScreenComponent,
  DataModelManagerComponent,
  QueryViewComponent,
  CreateViewComponent,
  AttributeViewComponent,
  JsonViewRendererComponent,
  WidgetDirective,
  RendererDirective,
  CodeEditorComponent,
  BaseWebsiteNavbarComponent,
  BaseWebsiteComponent,
  BaseWebsiteHomeComponent,
  BaseWebsiteLoginComponent,
  BaseWebsiteSignUpComponent,
  BaseWebsiteDashboardComponent,
  BaseWebsiteOverviewComponent,
  CreateProjectComponent,
  SocialComponent,
  AccountComponent,
  AccountInfoComponent,
  BaseWebsiteNotificationComponent
];
declarations = declarations.concat(design_screen_declarations);
console.log(declarations);
@NgModule({
  declarations: declarations,
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSnackBarModule,
    ScrollingModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    AddModel,
    MatRippleModule,
    MatTableModule,
    MatTreeModule,
    MatMenuModule,
    CommonModule,
    MatExpansionModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ConfigService,
    HomeDataService,
    AuthService,
    Document,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
