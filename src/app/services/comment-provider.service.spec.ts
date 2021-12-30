import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { CommentProviderService } from './comment-provider.service';

describe('CommentProviderService', () => {
  let service: CommentProviderService;
  const config: SocketIoConfig = { url: 'test' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, SocketIoModule.forRoot(config)],
      providers: [CommentProviderService ]
    });
    service = TestBed.inject(CommentProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
