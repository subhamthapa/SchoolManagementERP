import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebsiteSignUpComponent } from './base-website-sign-up.component';

describe('BaseWebsiteSignUpComponent', () => {
  let component: BaseWebsiteSignUpComponent;
  let fixture: ComponentFixture<BaseWebsiteSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebsiteSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWebsiteSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
