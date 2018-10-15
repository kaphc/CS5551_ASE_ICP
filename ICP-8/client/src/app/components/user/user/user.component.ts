import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "username": "",
    "password": "",
    "dateOfJoin": "",
    "cnfpassword": ""
  };
  users: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor(
    private userService: UserService,
    private toasterService: ToasterService
  ) {
    this.getAllUsers();
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.user = {
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": "",
      "username": "",
      "password": "",
      "dateOfJoin": "",
      "cnfpassword": ""
    };
  }
  back() {
    this.isList = true;
  }
  populate(user) {
    this.isList = false;
    this.isNew = false;
    this.user = user;
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  save() {
    if (this.user.firstName !== "" &&
      this.user.lastName !== "" &&
      this.user.email !== "" &&
      this.user.phone !== "" &&
      this.user.username !== "" &&
      this.user.password !== "" &&
      this.user.dateOfJoin !== "" &&
      this.user.cnfpassword !== "") {
      if (this.user.password === this.user.cnfpassword) {
        this.userService.addUser(this.user).subscribe(data => {
          var toast: Toast = {
            type: 'success',
            title: 'Success',
            body: 'User saved successfully.',
            showCloseButton: true
          };
          this.toasterService.pop(toast);
          this.isList = true;
          this.getAllUsers();
        });
      }else{
        var toast: Toast = {
          type: 'error',
          title: 'Error',
          body: 'Password mismatch.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
      }
    } else {
      var toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'Please fill the all the details.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    }
  }
  delete() {
    this.userService.deleteUser(this.user["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'User deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getAllUsers();
    });
  }
  update() {
    this.userService.updateUser(this.user).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'User updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getAllUsers();
    });
  }
  cancel() {
    this.isList = true;
  }
}
