import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesListComponent } from './product-sales-list.component';

describe('ProductSalesListComponent', () => {
  let component: ProductSalesListComponent;
  let fixture: ComponentFixture<ProductSalesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSalesListComponent]
    });
    fixture = TestBed.createComponent(ProductSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
