import { TestBed } from '@angular/core/testing';

import { ProductIdFieldService } from './product-id-field.service';

describe('ProductIdFieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductIdFieldService = TestBed.get(ProductIdFieldService);
    expect(service).toBeTruthy();
  });
});
