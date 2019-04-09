import { TestBed } from '@angular/core/testing';

import { ProductDeleteService } from './product-delete.service';

describe('ProductDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductDeleteService = TestBed.get(ProductDeleteService);
    expect(service).toBeTruthy();
  });
});
