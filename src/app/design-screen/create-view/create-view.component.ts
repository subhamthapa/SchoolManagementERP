import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Transformer } from './widgets';
import { UIBuilder } from '../ui-builder';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WidgetDirective } from '../widgets/directive';
import { Renderer2 } from '@angular/core';
import { Attributes } from './attribute';
import { WidgetManager } from '../widgets/widgets.manager';
import { MatMenuTrigger } from '@angular/material/menu';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { JsonEncoder } from '../engine/jsonEncoder';
import { JsonDecoder } from '../engine/jsonDecoder';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { WebAppConstants } from 'src/app/website.constants';
import { readFileSync, writeFileSync } from 'fs';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { Widget } from '../widgets/widget';
import { retry } from 'rxjs';
import { DynamicAppService } from '../dynamic-app.service';
import { DeployComponent } from '../deploy/deploy.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { data } from 'jquery';
import { BehaviourComponent } from '../behaviour/behaviour.component';

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.css'],
})
export class CreateViewComponent extends Widget implements OnInit {
  widgets = true;
  innerHtml: SafeHtml = '';
  transformer = new Transformer();
  builder!: UIBuilder;
  override attributes = new Attributes();
  widgetManager = new WidgetManager(this);
  jsonEncode = new JsonEncoder(this.widgetManager);
  jsonDecoder = new JsonDecoder(this.widgetManager);
  menuTopLeftPosition = { x: '0', y: '0' };
  callerContext: any;
  editCode = false;
  editorCallerType = '';
  rootComponent: any = this;
  override uniqueKey = -9999;
  static zoomScale = 1;
  zoomScale_ = 1;
  fileDialog = {} as MatBottomSheetRef<FileDialogComponent>;
  deployToWeb = {} as MatBottomSheetRef<DeployComponent>;
  viewMode = 0;
  static deployedViews: any = [];
  deployedViews_: any = [];
  currentLoadedView: any = null;
  actionCount = 0;
  toggleUndoRedo = false;
  justLoaded = false;
  action = '';

  @ViewChild(MatMenuTrigger) protected matMenu!: MatMenuTrigger;

  @ViewChild(WidgetDirective, { static: true }) widget!: WidgetDirective;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private dynamicAppService: DynamicAppService,
    private dialog: MatDialog
  ) {
    super();
    WidgetManager.addEditorSubsscriber(this.widgetManager);
    WidgetManager.addRendererSubscriber(this.widgetManager);
    this.rootComponent = this;
    this.widget_name = 'base_view';
    this.zoomScale_ = CreateViewComponent.zoomScale;
    this.deployedViews_ = CreateViewComponent.deployedViews;
  }

  loadDeployedView(view: any) {
    this.justLoaded = true;
    this.currentLoadedView = view;
    if (!this.widget) return;
    this.widgetManager.setViewContainerRef(this.widget.viewContainerRef);
    this.widgetManager.refreshScreen();
    this.jsonDecoder.decodeDeployed(view['json_view']);
    localStorage.removeItem('jsonView');
    localStorage.removeItem('jsonViewBackup');
    this.jsonEncode.encode();
    var ret = this.jsonEncode.storeJsonString();
    this.jsonEncode.storeBackupJsonString(ret);
    var viewMetaData = {
      name: view['name'],
      id: view['id'],
    };
    localStorage.setItem('viewMetaData', JSON.stringify(viewMetaData));
  }

  override ngOnInit(): void {
    if (CreateViewComponent.deployedViews.length == 0) {
      this.dynamicAppService.getJsonViews().subscribe(
        (success) => {
          CreateViewComponent.deployedViews = success;
          this.deployedViews_ = success;
          if (localStorage.getItem('viewMetaData')) {
            var id = JSON.parse(localStorage.getItem('viewMetaData') || '')[
              'id'
            ];
            if (id == -999999999) {
              this.currentLoadedView = { name: 'New View' };
              return;
            }
            for (var view of this.deployedViews_) {
              if (view.id == id) {
                this.currentLoadedView = view;
                return;
              }
            }
          }
        },
        (error) => {}
      );
    } else {
      if (localStorage.getItem('viewMetaData')) {
        var id = JSON.parse(localStorage.getItem('viewMetaData') || '')['id'];
        for (var view of this.deployedViews_) {
          if (view.id == id) {
            this.currentLoadedView = view;
            return;
          }
        }
      }
    }
    this.justLoaded = true;
  }
  ngAfterContentInit(): void {
    this.refreshScreen();
  }
  refreshScreen() {
    if (!this.widget) return;
    this.widgetManager.setViewContainerRef(this.widget.viewContainerRef);
    if (localStorage.getItem('jsonView')) {
      this.widgetManager.refreshScreen();
      this.jsonDecoder.decode(
        localStorage.getItem('jsonView') || '',
        null,
        true
      );
      this.jsonEncode.encode();
    }
  }
  insert(name: string) {
    this.jsonEncode.storeBackupJsonString();
    this.action = 'Insert';
    this.toggleUndoRedo = false;
    var element = this.widgetManager.insertWidget(name, this.callerContext);
    new Promise(() => {
      this.justLoaded = false;
      if (this.rootComponent.constructor.name == 'CreateViewComponent')
        this.jsonEncode.append(element);

      this.jsonEncode.storeJsonString();
    });
  }
  selectForAttribute($object: any, viewObject: any) {
    viewObject.attributes.setAttributes($object);
  }

  override signal(object: any) {
    new Promise(() => {
      this.toggleUndoRedo = false;
      this.attributes.setAttributes(object);
    });
  }
  override openMenu(event: MouseEvent, caller: any): boolean {
    this.callerContext = caller;
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenu.openMenu();
    return true;
  }
  disableRightClick() {
    return false;
  }
  deleteWidget() {
    this.action = 'delete';
    this.jsonEncode.storeBackupJsonString();
    this.toggleUndoRedo = false;
    this.widgetManager.deleteWidget(
      this.callerContext,
      this.callerContext.owner
    );
    new Promise(() => {
      this.justLoaded = false;
      this.jsonEncode.encode();

      this.jsonEncode.storeJsonString();
    });
  }
  editorFalgChanged($event: any) {
    this.editorCallerType = $event[0];
    this.editCode = $event[1];
  }
  saveLocal() {
    this.fileDialog = this._bottomSheet.open(FileDialogComponent);
    this.fileDialog.afterDismissed().subscribe((path) => {
      if (!path || path == '') return;
      var textFile: any = null;
      var makeTextFile = function (text: any) {
        var data = new Blob([text], { type: 'text/plain' });

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        // returns a URL you can use as a href
        return textFile;
      };
      var link = document.createElement('a');
      link.setAttribute('download', path);
      link.href = makeTextFile(this.jsonEncode.getJsonString());
      document.body.appendChild(link);

      // wait for the link to be added to the document
      window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
      });
    });
  }
  override signalChanged($event: any) {
    this.action = 'set attribute';
    this.jsonEncode.storeBackupJsonString();
    this.toggleUndoRedo = false;
    this.jsonEncode.encode();

    this.justLoaded = false;
    this.jsonEncode.storeJsonString();
  }
  render() {
    this.router.navigate(['/render', WebAppConstants.renderTemplateToken]);
  }
  move(flag: boolean) {
    this.action = 'move';
    this.jsonEncode.storeBackupJsonString();
    this.toggleUndoRedo = false;
    this.widgetManager.moveElement(this.callerContext, flag);
    this.jsonEncode.encode();

    this.justLoaded = false;
    this.jsonEncode.storeJsonString();
  }
  setAsRoot() {
    var root = this.callerContext.getRoot();
    if (root == null) {
      root = this.callerContext.owner.getRoot();
      if (root == null) {
        return;
      }
    }
    this.widgetManager.resetRoot();
    if (this.rootComponent.constructor.name != 'CreateViewComponent')
      this.rootComponent.unsetRootCss();
    if (root) {
      this.widgetManager.setRoot(root);
      if (this.callerContext.is_container)
        this.rootComponent = this.callerContext;
      else this.rootComponent = this.callerContext.owner;
      this.rootComponent.setRootCss();
    }
  }
  setAsRootUsingCaller(callerContext: any) {
    this.callerContext = callerContext;
    this.setAsRoot();
  }
  unsetAsRoot() {
    this.rootComponent.unsetRootCss();
    this.widgetManager.resetRoot();
    this.rootComponent = this;
  }
  jsonFileChanged($event: any) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.jsonDecoder.loadJSONPage(fileReader.result?.toString() || '');
      this.jsonEncode.encode();
      this.jsonEncode.storeJsonString();
      localStorage.removeItem('jsonViewBackup');
    };
    fileReader.readAsText($event.target.files[0]);
  }
  isRoot() {
    return (
      this.callerContext &&
      this.rootComponent &&
      this.callerContext.is_container &&
      (this.rootComponent.uniqueKey != this.callerContext.uniqueKey ||
        (this.rootComponent.uniqueKey != this.callerContext.uniquekey &&
          this.rootComponent.constructor.name !=
            this.callerContext.constructor.name))
    );
  }
  override applyRule(elemet: any) {}
  zoomIn() {
    CreateViewComponent.zoomScale += 0.1;
    this.zoomScale_ += 0.1;
  }
  zoomOut() {
    CreateViewComponent.zoomScale -= 0.1;
    this.zoomScale_ -= 0.1;
  }
  deployViewToWeb() {
    const config: MatBottomSheetConfig = {
      data: {
        encoder: this.jsonEncode,
        currentLoadedView: this.currentLoadedView,
      },
    };
    this.deployToWeb = this._bottomSheet.open(DeployComponent, config);
    this.deployToWeb.afterDismissed().subscribe((data) => {
      if (!data) return;
      this.currentLoadedView = data['view'];
      if (!data['new']) return;
      var viewMetaData = {
        name: data['view']['name'],
        id: data['id'],
      };
      localStorage.setItem('viewMetaData', JSON.stringify(viewMetaData));
      this.deployedViews_.push(data['view']);
      CreateViewComponent.deployedViews.push(data['view']);
      localStorage.setItem('jsonView', JSON.stringify(data['view']));
      this.widgets = false;
      this.refreshScreen();
    });
  }
  createNewView_() {
    localStorage.removeItem('jsonView');
    localStorage.removeItem('viewMetaData');
    this.widgetManager.clearScreen();
    this.jsonEncode.clear();
    var viewMetaData = {
      name: 'New View',
      id: -999999999,
    };
    localStorage.setItem('viewMetaData', JSON.stringify(viewMetaData));
    this.currentLoadedView = { name: 'New View' };
    this.widgets = true;
  }
  createNewView() {
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Warning',
        body: 'Do you want to create a new view ? If you have any unsaved changes then they will be lost.',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (event['flag']) {
        this.createNewView_();
      }
    });
  }
  purgeView(view: any) {
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Warning',
        body: 'Are you sure you want to delete this view ?',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (event['flag']) {
        this.dynamicAppService.purgeJsonView(view['id']).subscribe(
          (success) => {
            for (let i = 0; i < this.deployedViews_.length; i++) {
              if (this.deployedViews_[i]['id'] == view['id']) {
                this.deployedViews_.splice(i, 1);
                CreateViewComponent.deployedViews.splice(i, 1);
                this.currentLoadedView = null;
                if (this.deployedViews_.length == 0) {
                  this.createNewView_();
                } else {
                  if (i == this.deployedViews_.length) {
                    this.loadDeployedView(this.deployedViews_[i - 1]);
                  } else {
                    this.loadDeployedView(this.deployedViews_[i]);
                  }
                }
                return;
              }
            }
          },
          (error) => {}
        );
      }
    });
  }
  @HostListener('window:keydown.control.2', ['$event'])
  openTreeView($event: any) {
    const config: MatBottomSheetConfig = {
      data: {
        owner: this,
      },
    };
    var treeView = this._bottomSheet.open(TreeViewComponent, config);
    treeView.afterDismissed().subscribe((data) => {
      if (!data) return;
    });
  }
  undoRedo() {
    if (
      !localStorage.getItem('jsonViewBackup') ||
      localStorage.getItem('jsonViewBackup')?.trim() == ''
    )
      return;
    var x = localStorage.getItem('jsonView');
    localStorage.setItem(
      'jsonView',
      localStorage.getItem('jsonViewBackup') || ''
    );
    localStorage.setItem('jsonViewBackup', x || '');
    this.refreshScreen();
    this.jsonEncode.storeJsonString();
    this.toggleUndoRedo = !this.toggleUndoRedo;
  }
  setBehaviour() {
    const config: MatBottomSheetConfig = {
      data: {
        context: this.callerContext,
      },
    };
    var treeView = this._bottomSheet.open(BehaviourComponent, config);
    treeView.afterDismissed().subscribe((data) => {
      if (!data) return;
    });
  }
  signalToStoreWidgets(action: string) {
    this.action = action;
    this.jsonEncode.storeBackupJsonString();
    this.toggleUndoRedo = false;
    this.jsonEncode.storeJsonString();
  }
}
