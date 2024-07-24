import { Component, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';
import { MenuList } from 'src/app/utils/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuList: any;
  loggedUser:any = {};
  firstName: any = localStorage.getItem('firstName');
  lastname: any = localStorage.getItem('lastName');
  userName = this.firstName +" "+this.lastname;
  

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getMenuListByUserRole()
    console.log(this.userName);
  }


  getMenuListByUserRole() {
    this.menuList = MenuList;    

   // console.log(this.menuList, 'menu')
  }

  logout() {
    this.masterService.isLoggedOut();
  }

}
