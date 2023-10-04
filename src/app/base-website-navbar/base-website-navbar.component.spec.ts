import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebsiteNavbarComponent } from './base-website-navbar.component';

describe('BaseWebsiteNavbarComponent', () => {
  let component: BaseWebsiteNavbarComponent;
  let fixture: ComponentFixture<BaseWebsiteNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebsiteNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWebsiteNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
