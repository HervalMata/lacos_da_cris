import { TestBed } from '@angular/core/testing';

import { ProductOutputInsertService } from './product-output-insert.service';

describe('ProductOutputInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductOutputInsertService = TestBed.get(ProductOutputInsertService);
    expect(service).toBeTruthy();
  });
});
