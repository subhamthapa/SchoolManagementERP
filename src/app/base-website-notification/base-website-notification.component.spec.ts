import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebsiteNotificationComponent } from './base-website-notification.component';

describe('BaseWebsiteNotificationComponent', () => {
  let component: BaseWebsiteNotificationComponent;
  let fixture: ComponentFixture<BaseWebsiteNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebsiteNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWebsiteNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
