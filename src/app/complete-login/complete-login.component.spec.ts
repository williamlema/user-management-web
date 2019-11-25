import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLoginComponent } from './complete-login.component';

describe('CompleteLoginComponent', () => {
  let component: CompleteLoginComponent;
  let fixture: ComponentFixture<CompleteLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
