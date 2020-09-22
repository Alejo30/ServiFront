import { TestBed } from '@angular/core/testing';

import { ReservaGuard } from './reserva.guard';

describe('ReservaGuard', () => {
  let guard: ReservaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReservaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
