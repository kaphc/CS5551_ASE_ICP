import { Component } from '@angular/core';
import {AuthService} from './services/common/auth.service';
import { ToasterConfig } from 'angular2-toaster';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  public config : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    animation: 'fade'
  });
  constructor(
    private authService:AuthService,
  ) { }
}
