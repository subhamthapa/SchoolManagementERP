import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebsiteHomeComponent } from './base-website-home.component';

describe('BaseWebsiteHomeComponent', () => {
  let component: BaseWebsiteHomeComponent;
  let fixture: ComponentFixture<BaseWebsiteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebsiteHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWebsiteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
