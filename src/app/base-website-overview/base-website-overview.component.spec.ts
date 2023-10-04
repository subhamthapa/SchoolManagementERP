import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebsiteOverviewComponent } from './base-website-overview.component';

describe('BaseWebsiteOverviewComponent', () => {
  let component: BaseWebsiteOverviewComponent;
  let fixture: ComponentFixture<BaseWebsiteOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebsiteOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWebsiteOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
