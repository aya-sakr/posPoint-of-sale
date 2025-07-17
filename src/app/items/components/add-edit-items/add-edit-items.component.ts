import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../services/items.service';
import { Items } from 'src/app/Models/items';
import { SharedItemsService } from '../../services/shared-items.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-items',
  templateUrl: './add-edit-items.component.html',
  styleUrls: ['./add-edit-items.component.scss'],
})
export class AddEditItemsComponent implements OnInit {
  addItemMode: boolean = true;
  itemsForm!: FormGroup;
  editItemId: string = '';
  constructor(
    private fb: FormBuilder,
    private itemService: ItemsService,
    private sharedItemService: SharedItemsService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.initaiatItemsForm();
    this.editItemId = history.state.id
    
    if (this.editItemId) {
        
        this.editItem();
      } else {
       this.addItemMode=true
      }
      
  
  }
  initaiatItemsForm() {
    this.itemsForm = this.fb.group({
      barcode: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern('[A-za-z]{3,}')]],
      purchase: ['', Validators.required],
      wholesale: ['', Validators.required],
      retail: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
 
 
  editItem() {
    this.addItemMode = false;
    this.editItemForm(this.editItemId);
  }

  editItemForm(id: string) {
    this.itemService.getItemById(id).subscribe((res: Items) => {
      this.itemsForm.controls['barcode'].setValue(res.barcode),
        this.itemsForm.controls['name'].setValue(res.name),
        this.itemsForm.controls['purchase'].setValue(res.purchase),
        this.itemsForm.controls['wholesale'].setValue(res.wholesale),
        this.itemsForm.controls['retail'].setValue(res.retail),
        this.itemsForm.controls['quantity'].setValue(res.quantity);
    });
  }

  submitItem() {
    if (this.addItemMode) {
      this.itemService
        .postnewUser(this.itemsForm.value)
        .subscribe((res: Items[]) => {
          this.sharedItemService.setNewItem(res);
          this.toaster.success('The item added', 'Success');
          this.router.navigate(['/items']);
        });
    } else {
      this.itemService
        .updateItem(this.editItemId, this.itemsForm.value)
        .subscribe(() => {
          this.router.navigate(['/items']);
          this.toaster.success('The Item Updated');
        });
    }
  }
}
