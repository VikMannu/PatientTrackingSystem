import { TestBed } from '@angular/core/testing';

import { AttentionScheduleService } from './attention-schedule.service';

describe('AtentionScheduleService', () => {
  let service: AttentionScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttentionScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
