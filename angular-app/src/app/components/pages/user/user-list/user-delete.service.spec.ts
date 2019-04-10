import { TestBed } from '@angular/core/testing';

import { UserDeleteService } from './user-delete.service';

describe('UserDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDeleteService = TestBed.get(UserDeleteService);
    expect(service).toBeTruthy();
  });
});
