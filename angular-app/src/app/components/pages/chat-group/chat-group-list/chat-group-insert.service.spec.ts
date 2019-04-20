import { TestBed } from '@angular/core/testing';

import { ChatGroupInsertService } from './chat-group-insert.service';

describe('ChatGroupInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatGroupInsertService = TestBed.get(ChatGroupInsertService);
    expect(service).toBeTruthy();
  });
});
