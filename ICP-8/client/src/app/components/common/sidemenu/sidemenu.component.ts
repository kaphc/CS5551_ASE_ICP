import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  headerHeight: number;
  windowHeight: number;
  constructor(
    private authService:AuthService
  ) {
  }

  ngOnInit() {
   
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeSideMenu();
  }

  ngAfterViewInit(){
    this.resizeSideMenu();
  }

  resizeSideMenu(){
    this.headerHeight = document.getElementsByClassName("navbar-color")[0]["offsetHeight"];
    this.windowHeight = window.innerHeight;
    document.getElementsByClassName("side-navbar")[0]["style"]["height"] = (this.windowHeight - this.headerHeight) + "px";
  }
}
