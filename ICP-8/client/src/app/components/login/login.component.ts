import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/common/auth.service';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String="";
  password: String="";

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    if (this.username !== "" && this.password !== "") {
      const user = {
        username: this.username,
        password: this.password
      }

      this.authService.authenticateUser(user).subscribe(data => {
        console.log(data);
        if (data["success"]) {
          this.authService.storeUserData(data["token"], data["user"], data["privillages"]);
          console.log("Logged In");
          this.router.navigate(['home']);
        } else {
          var toast: Toast = {
            type: 'error',
            title: 'Error',
            body: 'Invalid Username/Password.',
            showCloseButton: true
          };
          this.toasterService.pop(toast);
          console.log("Login falied.");
          this.router.navigate(['/']);
        }
      });
    }
    else{
      var toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'Please fill the all the details.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    }
  }
}
