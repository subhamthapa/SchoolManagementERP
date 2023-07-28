import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeDataService } from '../home/data-service';
import { WebAppConstants } from '../website.constants';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  Form,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { HomePageConfigService } from './home-page-config.service';
import * as $ from 'jquery';
import Carousel from 'bootstrap/js/dist/carousel';
import { Model } from '../utilities/model';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { Grid } from '../utilities/grid';

@Component({
  selector: 'app-home-page-config',
  templateUrl: './home-page-config.component.html',
  styleUrls: ['./home-page-config.component.css'],
})
export class HomePageConfigComponent implements OnInit {
  apiHost: string = WebAppConstants.api_host;
  isLoading = false;
  imageFormGroup: FormGroup = new FormGroup({
    carouselImage: new FormControl('', Validators.required),
  });
  addCarouselImage = false;
  uploadImageFile: any = null;
  @ViewChildren('ci') elements!: QueryList<any>;
  carouselImageModified: boolean = false;
  addImageNote: boolean = false;
  addDemoImage: boolean = false;
  model: Model = new Model({
    carousalImages: [],
    imageNotes: [],
    demoImages: [],
  });
  formGroupImage: any;
  formGroupImageNote: any;
  fromGroupDemoImage: any;
  index: number = 0;
  demoImageGrid: Grid = new Grid(3);

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private homeDataService: HomeDataService,
    private homePageConfigService: HomePageConfigService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.formGroupImage = this.formBuilder.group({
      image: [''],
    });
    this.formGroupImageNote = this.formBuilder.group({
      image: [''],
    });
    this.fromGroupDemoImage = this.formBuilder.group({
      image: [''],
    });
    this.homeDataService.getWebsiteHomeDataObserable().subscribe(
      (success) => {
        this.model.insertAttributesIntoAttribute(
          'carousalImages',
          success.carousel_images
        );
        this.model.insertAttributesIntoAttribute(
          'imageNotes',
          success.image_notes,
          { disabled: true }
        );
        this.demoImageGrid.refreshGrid(success.demo_images, {});
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
  close() {
    this.router.navigate(['.'], { relativeTo: this.activeRoute.parent });
  }
  setImageFile(event: any) {
    if (event.target.files.length == 0) return;
    this.uploadImageFile = event.target.files[0];
    this.formGroupImage.get('image').setValue(this.uploadImageFile);
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadImageFile);
    reader.onload = () => {
      this.model.insert('carousalImages', {
        image: reader.result,
        filesystem: true,
      });
      this.carouselImageModified = true;
    };
  }
  ngAfterViewInit() {
    this.elements.changes.subscribe(() => {
      if (this.carouselImageModified) {
        var length = $('.carousel-inner').children().length;
        var carousal = new Carousel('#website_carousel');
        carousal.to(length - 1);
        this.index = length - 1;
        this.carouselImageModified = false;
      }
    });
  }
  cancelUploadCarouselImage() {
    var carousal = new Carousel('#website_carousel');
    carousal.to(0);
    this.model.cancelChange('carousalImages');
  }
  uploadImageFileOnClick() {
    if (this.uploadImageFile) {
      const formData = new FormData();
      formData.append('image', this.formGroupImage.get('image').value);
      formData.append(
        'order',
        this.model.deferred_attributes['carousalImages'].length
      );
      this.isLoading = true;
      this.homePageConfigService
        .uploadCarouselImageObservable(formData)
        .subscribe(
          (success) => {
            debugger;
            this.addCarouselImage = false;
            var carousal = new Carousel('#website_carousel');
            carousal.to(0);
            this.model.replaceDefferedElement(
              'carousalImages',
              this.index,
              success
            );
            this.isLoading = false;
          },
          (error) => {
            this.snackbar.open(error['error']['error'], 'Ok', {
              duration: 1000,
            });
            this.isLoading = false;
          }
        );
    } else {
      this.snackbar.open('Plese select a carousel image.', 'Ok', {
        duration: 800,
      });
    }
  }
  deleteCarouselImage() {
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Do you want to delete this carousel image?',
        body: '',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (event['flag']) {
        var data = {
          id: $('#carousel_image_container')
            .children('.active')
            .children()
            .attr('img_id'),
        };
        this.isLoading = true;
        this.homePageConfigService
          .deleteCarouselImageObservable(data)
          .subscribe(
            (success) => {
              this.model.clearAttribute('carousalImages');
              this.model.insertAttributesIntoAttribute(
                'carousalImages',
                success
              );
              this.isLoading = false;
            },
            (error) => {
              this.snackbar.open(error['error']['error'], 'Ok', {
                duration: 1000,
              });
              this.isLoading = false;
            }
          );
      }
    });
  }
  focus(id: number, flag: boolean) {
    if (!flag) {
      $(document).ready(() => $('#text_area_' + id).trigger('focus'));
    } else {
      this.model.cancelChange('imageNotes');
    }
  }
  saveImageNote(id: number, object: any) {
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Do you save your changes ?',
        body: '',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (event['flag']) {
        var data = {
          id: id,
          text: $('#text_area_' + id).val(),
        };
        this.isLoading = true;
        this.homePageConfigService.saveImageNoteObservable(data).subscribe(
          (success) => {
            object['disabled'] = true;
            this.model.deferApplyAnAttribute('imageNotes');
            this.isLoading = false;
          },
          (error) => {
            this.snackbar.open(error['error']['error'], 'Ok', {
              duration: 1000,
            });
            this.isLoading = false;
          }
        );
      }
    });
  }
  deleteImageNote(id: number, index: number) {
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Do you want to delete this Image Note ?',
        body: '',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (!event['flag']) return;
      this.isLoading = true;
      this.homePageConfigService
        .deleteImageNoteObservable({ id: id })
        .subscribe(
          (success) => {
            this.model.delete('imageNotes', index);
            this.model.deferApplyAnAttribute('imageNotes');
            this.isLoading = false;
          },
          (error) => {
            this.snackbar.open(error['error']['error'], 'Ok', {
              duration: 1000,
            });
            this.isLoading = false;
          }
        );
    });
  }
  setImageNoteImage(event: any) {
    if (event.target.files.length == 0) return;
    this.formGroupImageNote.get('image').setValue(event.target.files[0]);
  }
  createImageNote() {
    if (!this.formGroupImageNote.get('image').value) {
      this.snackbar.open('Please select an image.', 'Ok', { duration: 800 });
      return;
    }
    if (('' + $('#imageNoteText').val()).trim() === '') {
      $('#imageNoteText').trigger('focus');
      this.snackbar.open('Note cannot be blank!', 'Ok', { duration: 800 });
      return;
    }
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Do you want to add this Image Note ?',
        body: '',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (!event['flag']) return;
      var formData = new FormData();
      formData.append('image', this.formGroupImageNote.get('image').value);
      var note: string = '' + $('#imageNoteText').val();
      formData.append('note', note);
      this.isLoading = true;
      this.homePageConfigService.addImageNoteObservable(formData).subscribe(
        (success) => {
          this.isLoading = false;
          debugger;
          this.model.insertIntoAttribute('imageNotes', success, {
            disabled: true,
          });
          this.addImageNote = false;
          $('#imageNoteText').val('');
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open(error['error']['error'], 'Ok', { duration: 1000 });
        }
      );
    });
  }
  setDemoImageFile(event: any) {
    if (event.target.files.length == 0)
      return;
    this.fromGroupDemoImage.get('image').setValue(event.target.files[0]);
  }
  uploadDemoImage()
  {
    if (!this.fromGroupDemoImage.get('image').value) {
      this.snackbar.open('Please select an image.', 'Ok', { duration: 800 });
      return;
    }
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Do you want to add this Image Note ?',
        body: '',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (!event['flag']) return;
      var formData = new FormData();
      formData.append('image', this.fromGroupDemoImage.get('image').value);
      this.isLoading = true;
      this.homePageConfigService.addDemoImageObservable(formData).subscribe(
        success=>
        {
          this.isLoading = false
          this.addDemoImage = false
          this.fromGroupDemoImage.get('image').value = ""
          this.demoImageGrid.addIntoGrid(success)
          this.demoImageGrid.applyChanges()
        }
        ,
        error=>
        {
          this.snackbar.open(error['error']['error'], 'Ok', {
            duration: 1000,
          });
          this.isLoading = false;
        }
      )
    })
  }
  deleteDemoImage(id: number, index: number, column:number) {
    var dialog = this.dialog.open(DialogComponent, {
      data: {
        heading: 'Do you want to delete this Image ?',
        body: '',
      },
    });
    dialog.afterClosed().subscribe((event) => {
      if (!event['flag']) return;
      this.isLoading = true;
      this.homePageConfigService
        .deleteDemoImageObservable({ id: id })
        .subscribe(
          (success) => {
            this.demoImageGrid.deleteFromGrid(column, index);
            this.demoImageGrid.applyChanges()
            this.demoImageGrid.reShuffleGrid()
            this.isLoading = false;
          },
          (error) => {
            this.snackbar.open(error['error']['error'], 'Ok', {
              duration: 1000,
            });
            this.isLoading = false;
          }
        );
    });
  }
}
