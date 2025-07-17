import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesFormComponent } from './product-sales-form.component';

describe('ProductSalesFormComponent', () => {
  let component: ProductSalesFormComponent;
  let fixture: ComponentFixture<ProductSalesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSalesFormComponent]
    });
    fixture = TestBed.createComponent(ProductSalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
