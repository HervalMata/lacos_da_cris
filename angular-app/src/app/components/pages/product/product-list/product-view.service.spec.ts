import { TestBed } from '@angular/core/testing';

import { ProductViewService } from './product-view.service';

describe('ProductViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductViewService = TestBed.get(ProductViewService);
    expect(service).toBeTruthy();
  });
});
