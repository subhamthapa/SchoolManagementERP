import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonViewRendererComponent } from './json-view-renderer.component';

describe('JsonViewRendererComponent', () => {
  let component: JsonViewRendererComponent;
  let fixture: ComponentFixture<JsonViewRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonViewRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonViewRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
