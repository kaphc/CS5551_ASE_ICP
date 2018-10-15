import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  public name:string;
  constructor(
    private authService:AuthService,
    private router:Router
  ) {
    
   }

  ngOnInit() {
  
  }

  onLogoutClick(){
    this.authService.logout();
    console.log("Logout");
    this.router.navigate(['/']);
    this.isCollapsed = !this.isCollapsed
    return false;
  }
  updateMenu(route){
    var menu=this.authService.getSideMenuPage(route);
    this.router.navigate([menu.name]);
  }
}
