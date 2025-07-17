
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemsService } from 'src/app/items/services/items.service';
import { SalesSharedService } from '../../Service/sales-shared.service';
import { distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-product-sales-form',
  templateUrl: './product-sales-form.component.html',
  styleUrls: ['./product-sales-form.component.scss'],
})
export class ProductSalesFormComponent implements OnInit {
  @ViewChild('quantityElement') quantityElement!: ElementRef;
  productSalesForm!: FormGroup;
  allProducts: any[] = [];
  productList: any[] = [];
  selectedPric: number = 0;
  totalSalesPrice: number = 0;
  mode: boolean = true;
  selectedProduct: any = null;
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private toaster: ToastrService,
    private router: Router,
    private shraredSalesService: SalesSharedService
  ) {
    this.productSalesForm = this.fb.group({
      barcode: ['', [Validators.required, Validators.pattern('[0-9]{6,}')]],
      productName: ['', Validators.required],
      priceType: ['retail', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      totalPrice: ['', Validators.required],
      id: [''],
    });
  }

  ngOnInit() {
    this.getProducts();

    // upate total price when Quantity change
      this.productSalesForm
      .get('quantity')
        ?.valueChanges.subscribe((qty: number) => {
         
        this.updateTotalPrice(qty);
      });

    // update price when radio button change
    this.productSalesForm
      .get('priceType')
      ?.valueChanges.subscribe((type: string) => {
        if (this.productSalesForm.value.productName) {
          this.updatePrice(type);
        }
      });

    this.productSalesForm.get('price')?.valueChanges.subscribe((res) => {
      const quantity = this.productSalesForm.value.quantity;
      this.updateTotalPrice(quantity);
    });
    this.getProductByBarcode();
  }

  getProducts() {
    this.itemsService.getAllItems().subscribe((data: any) => {
      this.allProducts = data;
    });
  }

  getProductByBarcode() {
    this.productSalesForm
      .get('barcode')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value: any) => {
        if (this.productSalesForm.get('barcode')?.valid) {
          this.itemsService.getProductByBarcode(value).subscribe((res: any) => {
           

            if (res) {
              const product = res[0];
              this.productSalesForm.patchValue({
                productName: product.name,
                price: product.retail,
                priceType: 'retail',
                quantity: 1
              });
              this.selectedPric = product.retail;
              this.totalSalesPrice = this.selectedPric
              this.quantityElement.nativeElement.focus();
            }
          });
        }
      });
  }
 

  searchByName() {
   
    if (this.selectedProduct && this.selectedProduct.trim() !== '') {
      this.productList = this.allProducts.filter((product: any) => {
        return product.name
          .toLowerCase()
          .includes(this.selectedProduct.toLowerCase());
      });
    } else {
      this.productList = [...this.allProducts]
    }
      
    
  }

  onProductSelect(event: any) {
    const query = event.value;
    this.itemsService
      .getProductByName(query.name)
      .subscribe((response: any) => {
   
        
        const product = response[0];
        if (product.barcode === '') {
          this.mode = false;
        }
        this.productSalesForm.patchValue({
          barcode: product.barcode,
          productName: product.name,
          price: product.retail,
        });
        this.selectedPric = product.retail;
        this.quantityElement.nativeElement.focus();
        this.productId = product.id;
      });
  }
  updatePrice(type: string) {
    this.itemsService
      .getProductByName(this.productSalesForm.value.productName)
      .subscribe((res: any) => {
        const product = res[0];
        if (type === 'retail') {
          this.selectedPric = product.retail;
        } else if (type === 'wholesale') {
          this.selectedPric = product.wholesale;
        }

        this.productSalesForm.patchValue({
          price: this.selectedPric,
        });
      });
  }
  updateTotalPrice(quantity: number) {
    this.totalSalesPrice = quantity * this.selectedPric;
    this.productSalesForm.patchValue({
      totalPrice: this.totalSalesPrice,
    });
  }

  submitData() {
    const product = this.productSalesForm.value;
    if (!this.mode) {
      const newBarcode = this.productSalesForm.value.barcode;
      this.itemsService
        .updateBarcodeOnly(this.productId, newBarcode)
        .subscribe(() => {
          this.toaster.success('The product Updated ', 'Success');
        });
      this.mode = true;
    } else {
      const formData = this.productSalesForm.value;
     

      this.shraredSalesService.sendformData(formData);

      // this.updateQuantity(formData.quantity)

      this.resetForm();
    }
  }
  resetForm() {
    this.productSalesForm.reset((this.selectedPric = 0));
    this.productSalesForm.patchValue({
      priceType: 'retail',
    });

    this.quantityElement.nativeElement.blur();
    this.selectedProduct = ''
  }
 
      

}
