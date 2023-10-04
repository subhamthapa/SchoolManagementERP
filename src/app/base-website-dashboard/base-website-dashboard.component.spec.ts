import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebsiteDashboardComponent } from './base-website-dashboard.component';

describe('BaseWebsiteDashboardComponent', () => {
  let component: BaseWebsiteDashboardComponent;
  let fixture: ComponentFixture<BaseWebsiteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebsiteDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWebsiteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
