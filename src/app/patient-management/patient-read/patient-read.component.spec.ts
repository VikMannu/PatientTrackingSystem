import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReadComponent } from './patient-read.component';

describe('PatientReadComponent', () => {
  let component: PatientReadComponent;
  let fixture: ComponentFixture<PatientReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
