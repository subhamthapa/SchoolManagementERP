import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModelManagerComponent } from './data-model-manager.component';

describe('DataModelManagerComponent', () => {
  let component: DataModelManagerComponent;
  let fixture: ComponentFixture<DataModelManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataModelManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataModelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
