import { TestBed } from '@angular/core/testing';

import { UrlPreviewService } from './url-preview.service';

describe('UrlPreviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlPreviewService = TestBed.get(UrlPreviewService);
    expect(service).toBeTruthy();
  });
});
