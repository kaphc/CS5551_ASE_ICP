import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinegroupComponent } from './machinegroup.component';

describe('MachinegroupComponent', () => {
  let component: MachinegroupComponent;
  let fixture: ComponentFixture<MachinegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
