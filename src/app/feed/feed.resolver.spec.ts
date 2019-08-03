import { TestBed } from '@angular/core/testing';

import { FeedResolver } from './feed.resolver';

describe('FeedResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedResolver = TestBed.get(FeedResolver);
    expect(service).toBeTruthy();
  });
});
