import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemsService } from 'src/app/items/services/items.service';
import { Items } from 'src/app/Models/items';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss'],
})
export class ReturnComponent {
  // @ViewChild('quantityInput') quantityInput!: ElementRef;
  productBarcode: string = '';
  returnProduct: Items[] = [];
  returnQuantity: number = 1;
  isTableVisibile: boolean = false;

  constructor(
    private itemService: ItemsService,
    private toaster: ToastrService
  ) {}

  getreturnProduct(barcode: string) {
    this.itemService.getProductByBarcode(barcode).subscribe((res: Items[]) => {
      this.returnProduct = res;

      this.isTableVisibile = true;
      this.productBarcode = '';
    });
  }
  returnItem() {
    const totalQuantity = this.returnProduct[0].quantity;
    const updateTotalQuantity = +totalQuantity + +this.returnQuantity;
    this.itemService
      .updateQuantity(this.returnProduct[0].id, updateTotalQuantity)
      .subscribe(() => {
        this.toaster.success(' Total Quantity upated', 'Success');
      });
    this.isTableVisibile = false;
  }
}
