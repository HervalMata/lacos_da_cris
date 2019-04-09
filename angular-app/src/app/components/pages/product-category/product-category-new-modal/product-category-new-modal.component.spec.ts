import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryNewModalComponent } from './product-category-new-modal.component';

describe('ProductCategoryNewModalComponent', () => {
  let component: ProductCategoryNewModalComponent;
  let fixture: ComponentFixture<ProductCategoryNewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryNewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
