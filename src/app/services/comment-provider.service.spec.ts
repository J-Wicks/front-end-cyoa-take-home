import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CommentProviderService } from './comment-provider.service';

describe('CommentProviderService', () => {
  let service: CommentProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CommentProviderService ]
    });
    service = TestBed.inject(CommentProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
