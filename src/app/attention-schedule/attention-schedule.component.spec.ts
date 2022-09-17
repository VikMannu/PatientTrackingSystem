import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionScheduleComponent } from './attention-schedule.component';

describe('AtentionScheduleComponent', () => {
  let component: AttentionScheduleComponent;
  let fixture: ComponentFixture<AttentionScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttentionScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttentionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
