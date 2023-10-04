import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebsiteLoginComponent } from './base-website-login.component';

describe('BaseWebsiteLoginComponent', () => {
  let component: BaseWebsiteLoginComponent;
  let fixture: ComponentFixture<BaseWebsiteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebsiteLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWebsiteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
