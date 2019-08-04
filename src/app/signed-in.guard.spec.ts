import { TestBed, async, inject } from '@angular/core/testing';

import { SignedInGuard } from './signed-in.guard';

describe('SignedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignedInGuard]
    });
  });

  it('should ...', inject([SignedInGuard], (guard: SignedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
