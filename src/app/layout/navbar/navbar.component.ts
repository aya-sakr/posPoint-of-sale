import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/auth/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  dropdownOpen: boolean = false;
  dateNow;
  constructor(private sharedService: SharedService) {
    this.dateNow = new Date();
  }
  ngOnInit() {
    this.sharedService.getUserName().subscribe((result) => {
      this.userName = result;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
