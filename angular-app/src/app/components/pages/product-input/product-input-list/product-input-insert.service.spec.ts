import { TestBed } from '@angular/core/testing';

import { ProductInputInsertService } from './product-input-insert.service';

describe('ProductInputInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductInputInsertService = TestBed.get(ProductInputInsertService);
    expect(service).toBeTruthy();
  });
});
