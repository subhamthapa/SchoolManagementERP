import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignScreenComponent } from './design-screen.component';

describe('DesignScreenComponent', () => {
  let component: DesignScreenComponent;
  let fixture: ComponentFixture<DesignScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
