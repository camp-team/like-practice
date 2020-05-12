import { TestBed } from '@angular/core/testing';

import { ArtileService } from './article.service';

describe('ArtileService', () => {
  let service: ArtileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
