import { TestBed } from '@angular/core/testing';

import { DarkThemeService } from './dark-theme.service';

describe('DarkThemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DarkThemeService = TestBed.get(DarkThemeService);
    expect(service).toBeTruthy();
  });
});
