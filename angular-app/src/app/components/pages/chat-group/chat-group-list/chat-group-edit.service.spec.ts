import { TestBed } from '@angular/core/testing';

import { ChatGroupEditService } from './chat-group-edit.service';

describe('ChatGroupEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatGroupEditService = TestBed.get(ChatGroupEditService);
    expect(service).toBeTruthy();
  });
});
