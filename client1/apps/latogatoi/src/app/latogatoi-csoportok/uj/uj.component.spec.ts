import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UjComponent } from './uj.component';

describe('UjComponent', () => {
  let component: UjComponent;
  let fixture: ComponentFixture<UjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
