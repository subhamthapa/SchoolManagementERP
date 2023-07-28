import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageConfigComponent } from './home-page-config.component';

describe('HomePageConfigComponent', () => {
  let component: HomePageConfigComponent;
  let fixture: ComponentFixture<HomePageConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
