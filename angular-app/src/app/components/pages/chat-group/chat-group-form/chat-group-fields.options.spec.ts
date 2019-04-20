import { TestBed } from '@angular/core/testing';

import { ChatGroupIdFieldService } from './chat-group-fields.options';

describe('ChatGroupIdFieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatGroupIdFieldService = TestBed.get(ChatGroupIdFieldService);
    expect(service).toBeTruthy();
  });
});
