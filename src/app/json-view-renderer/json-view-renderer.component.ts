import { Component, ViewChild } from '@angular/core';
import { RendererDirective } from './directive';
import { WidgetManager } from '../design-screen/widgets/widgets.manager';
import { ActivatedRoute, Router } from '@angular/router';
import { WebAppConstants } from '../website.constants';
import { JsonDecoder } from '../design-screen/engine/jsonDecoder';
import { Widget } from '../design-screen/widgets/widget';
import { DynamicAppService } from '../design-screen/dynamic-app.service';
import { DataModelManagerService } from '../data-model-manager/data-model-manager.service';

@Component({
  selector: 'app-json-view-renderer',
  templateUrl: './json-view-renderer.component.html',
  styleUrls: ['./json-view-renderer.component.css'],
})
export class JsonViewRendererComponent extends Widget {
  @ViewChild(RendererDirective, { static: true }) webPage!: RendererDirective;
  widgetManager = new WidgetManager(this);
  jsonDecoder = new JsonDecoder(this.widgetManager);
  webPageurl = '';

  constructor(
    private router: Router,
    private dynamicAppService: DynamicAppService,
    public dataModelService: DataModelManagerService,
    route: ActivatedRoute
  ) {
    super();
    WidgetManager.getRendererSubscriber() == null
      ? WidgetManager.addRendererSubscriber(new WidgetManager(this))
      : '';
    this.webPageurl = this.router.url;
    route.params.subscribe((val) => {
      this.webPageurl = this.router.url
      this.refreshView()
    });
  }
  refreshView() {
    this.widgetManager.setViewContainerRef(this.webPage.viewContainerRef);
    if (this.webPageurl == '/render/' + WebAppConstants.renderTemplateToken) {
      this.jsonDecoder.decode(
        localStorage.getItem('jsonView') || '',
        null,
        false
      );
    } else {
      var url = this.webPageurl.split("render/")[1]
      this.dynamicAppService
        .getJsonViewUsingUrl(url)
        .subscribe(
          (success: any) => {
            this.widgetManager.clearScreen();
            this.jsonDecoder.decodeDeployed(success['json_view'], null, false);
          },
          (error) => {}
        );
    }
  }
  override ngAfterViewInit(): void {
    this.refreshView();
  }
}
