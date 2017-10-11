import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApplicationComponent } from './manage-application.component';

describe('ManageApplicationComponent', () => {
  let component: ManageApplicationComponent;
  let fixture: ComponentFixture<ManageApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
