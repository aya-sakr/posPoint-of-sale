import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  isLoading: boolean = false;
  SearchMode: boolean = false;
  searchText: string = '';
  dataSource: any;
  allItems: any;
  filteredArray: any;
  displayedColumns: string[] = [
    'barcode',
    'name',
    'purchase',
    'wholesale',
    'retail',
    'quantity',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private itemService: ItemsService,
    private router: Router,
    protected toaster: ToastrService
  ) {}
  ngOnInit() {
    this.getItems();
  }
  filterItems() {
    if (!this.searchText) {
      this.getItems();
    } else {
      this.filteredArray = this.allItems.filter((item: any) => {
        return item.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
  }

  searchItems() {
    if (this.allItems.length > 0) {
      this.SearchMode = true;
    } else {
      this.SearchMode = false;
    }
  }
  onSearch() {
    this.filteredArray = this.allItems.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
    
  }
  
  clearSearchText() {
    this.searchText = ''
    this.getItems()
  }
  getItems() {
      this.itemService.getAllItems().subscribe((res) => {
        this.isLoading = false;
        this.allItems = res;
        this.filteredArray = this.allItems;
        this.filteredArray.paginator = this.paginator;

        this.searchItems();
      });

  }
  editItem(editId: string) {
    this.router.navigate(['/items/additems'], { state: { id: editId } });
  }

  deletItem(id: string, index: number) {
    this.itemService.deletItem(id).subscribe(() => {
      this.toaster.success('The Item Deleted', 'Success');
      this.allItems.splice(index, 1);
      this.getItems();
    });
  }

  addNewItems() {
    this.router.navigate(['/items/additems'], { state: { id: '' } });
  }
}
