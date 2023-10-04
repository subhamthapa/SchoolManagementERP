import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWebsiteComponent } from './base-website.component';

describe('BaseWebsiteComponent', () => {
  let component: BaseWebsiteComponent;
  let fixture: ComponentFixture<BaseWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseWebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
