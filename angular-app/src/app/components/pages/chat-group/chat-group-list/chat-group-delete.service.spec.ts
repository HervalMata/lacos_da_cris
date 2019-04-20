import { TestBed } from '@angular/core/testing';

import { ChatGroupDeleteService } from './chat-group-delete.service';

describe('ChatGroupDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatGroupDeleteService = TestBed.get(ChatGroupDeleteService);
    expect(service).toBeTruthy();
  });
});
