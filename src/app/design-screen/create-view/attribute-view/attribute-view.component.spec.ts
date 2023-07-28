import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeViewComponent } from './attribute-view.component';

describe('AttributeViewComponent', () => {
  let component: AttributeViewComponent;
  let fixture: ComponentFixture<AttributeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
