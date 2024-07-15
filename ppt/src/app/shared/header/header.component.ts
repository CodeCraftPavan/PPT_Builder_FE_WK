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
  userName = localStorage.getItem('userName')

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getMenuListByUserRole()
  }


  getMenuListByUserRole() {
    this.menuList = MenuList;    

   // console.log(this.menuList, 'menu')
  }

  logout() {
    this.masterService.isLoggedOut();
  }

}
