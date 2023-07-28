import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPagesComponent } from './config-pages.component';

describe('ConfigPagesComponent', () => {
  let component: ConfigPagesComponent;
  let fixture: ComponentFixture<ConfigPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
