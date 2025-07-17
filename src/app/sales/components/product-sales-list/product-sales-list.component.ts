import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalesSharedService } from '../../Service/sales-shared.service';
import { ItemsService } from 'src/app/items/services/items.service';


@Component({
  selector: 'app-product-sales-list',
  templateUrl: './product-sales-list.component.html',
  styleUrls: ['./product-sales-list.component.scss'],
})
export class ProductSalesListComponent implements OnInit {
  productPillForm!: FormGroup;
  showTableMode: boolean = false;
  filterProduct: any[] = [];
  formData: any[] = [];
  totalPrice: any;
  searchText: any;
  itemTotalQuantity: number = 0
  id: string = ''

  constructor(
    private toaster: ToastrService,
    private fb: FormBuilder,
    private sharedSalesService: SalesSharedService,
    private itemService: ItemsService
 
  ) {
    this.productPillForm = this.fb.group({
      sumTotalQuantity: [],
      sumTotalPrice: [],
    });
  }

  ngOnInit() {
    this.getSalesProduct();
  }

  getSalesProduct() {
    
    this.sharedSalesService.getFormData().subscribe((response) => {
     
      
      if (!response) return;
      const newProducts = Array.isArray(response) ? response : [response];

      newProducts.forEach((product: any) => {
        const indexExist = this.formData.findIndex(
          (p) => p.barcode === product.barcode
        );

        if (indexExist === -1) {
        
          
          this.formData.push(product);    
          this.showTableMode = true;
          this.sumTotals();
        } else {
          this.formData[indexExist].quantity = Number(product.quantity) || 1;
          this.sumTotals();
        }
      });
    });
  }
  onSearch() {
    if (this.searchText && this.searchText.trim() !== '') {
      this.filterProduct = this.formData.filter((item: any) => {
        return item.productName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
    }
  
  }

  clearSearchText() {
    this.searchText = '';
   
  }

  onQuantityChange(event: any, index: number) {
    this.formData[index].quantity = event;

    this.formData[index].totalPrice = this.formData[index].price * event;
    this.sumTotals();
  }
  decreaseQuantity(index: number) {
    if (this.formData[index].quantity > 1) {
      this.formData[index].quantity--;
      this.onQuantityChange(this.formData[index].quantity, index);
      this.sumTotals();
    }
  }
  increaseQuantity(index: number) {
    this.formData[index].quantity++;
    this.onQuantityChange(this.formData[index].quantity, index);
    this.sumTotals();
  }
  sumTotals() {
    const totalQuantity = this.formData.reduce(
      (acc, item) => acc + Number(item.quantity || 0),
      0
    );
    const totalPrice = this.formData.reduce(
      (acc, item) => acc + Number(item.totalPrice || 0),
      0
    );

    this.productPillForm.patchValue({
      sumTotalQuantity: totalQuantity,
      sumTotalPrice: totalPrice,
    });
  }
  deletProduct(index: number) {
    this.formData.splice(index, 1);
    this.toaster.success('The product deleted ', 'success');
    this.sumTotals()
  }

  updateItemQuantity() {

    
  }

  onPay() {
    this.formData.forEach(product => {
    
      this.itemService.getProductByBarcode(product.barcode).subscribe((item: any) => {
       
        
        const currentQuantity = item[0].quantity
        console.log(currentQuantity, 'current');
        const id = item[0].id
        
        const updateQuantity = currentQuantity - product.quantity
        if (updateQuantity < 1) {
          this.toaster.error ('Quantity not found ','Error')
          
        } else {
          this.itemService.updateQuantity(id, updateQuantity).subscribe(() => {
            // this.toaster.success('Quantity Updated')
           
          })
          
        }
      
        
       
         
      
        
      });
      
    })
   

      

    
    console.log(this.productPillForm.value);
    console.log(this.formData);
    

  }
  deletPill() {
    this.productPillForm.reset();
  }
}
