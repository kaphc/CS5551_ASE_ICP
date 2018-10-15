import { Component, OnInit, ViewChild } from '@angular/core';
import { Privillages } from '../../../services/common/privillages';
import { UsergroupService } from '../../../services/user/usergroup.service';
import { UserService } from '../../../services/user/user.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {

  usergroup = {
    "name": "",
    "description": "",
    "users": [],
    "privillages": []
  };
  privillagesList: any;
  usergroups: any;
  isList: boolean = true;
  isNew: boolean = true;
  /*Auto complete variables start */
  search: string;
  searchResults: any;
  showResults: boolean;
  /*Auto complete variables end */
  constructor(
    private privillages: Privillages,
    private usergroupService: UsergroupService,
    private userService: UserService,
    private toasterService: ToasterService
  ) {
    this.getAllUserGroups();
    this.privillagesList = privillages.getPrivillages();
  }

  ngOnInit() {
  }
  new() {
    this.isList = false;
    this.isNew = true;
    this.usergroup = {
      "name": "",
      "description": "",
      "users": [],
      "privillages": []
    };
  }

  back() {
    this.isList = true;
  }
  populate(usergroup) {
    this.isList = false;
    this.isNew = false;
    this.usergroup = usergroup;
    this.updatePrivillages(this.usergroup.privillages);
  }

  updatePrivillages(privillages) {
    this.privillagesList.forEach(element => {
      privillages.forEach(el => {
        if (el == element.name) {
          element.set = true;
        }
      });
    });
  }

  privillageSelected(priv) {
    if (this.usergroup.privillages.indexOf(priv.name) < 0) {
      this.usergroup.privillages.push(priv.name);
      priv.set = true;
    }
    else {
      this.usergroup.privillages.splice(this.usergroup.privillages.indexOf(priv.name), 1);
      priv.set = false;
    }
  }

  getAllUserGroups() {
    this.usergroupService.getUserGroups().subscribe(data => {
      this.usergroups = data;
    });
  }

  save() {
    if (this.usergroup.name !== "" &&
      this.usergroup.description !== "") {
      this.usergroupService.addUserGroup(this.usergroup).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Usergroup saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getAllUserGroups();
      });
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
  /*Auto complete methods start */
  onSearchChange(value) {
    if (value.length > 2) {
      this.userService.getUserName(value).subscribe(data => {
        this.showResults = true;
        this.searchResults = data;
        console.log(data);
      });
    }
  }

  selectedItem(item) {
    this.search = item.username;
    this.showResults = false;
  }

  addUserToUserGroup(searchTerm) {
    let user = this.searchResults.filter(function (el) {
      return el.username === searchTerm;
    })[0];
    this.search = "";
    this.usergroup.users.push(user);
  }
  deleteUser(user) {
    this.usergroup.users = this.usergroup.users.filter(function (el) {
      return el._id !== user._id;
    });
  }
  /*Auto complete methods end */
  delete() {
    this.usergroupService.deleteUserGroup(this.usergroup["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Usergroup deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getAllUserGroups();
    });
  }

  update() {
    this.usergroupService.updateUserGroup(this.usergroup).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Usergroup updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getAllUserGroups();
    });
  }

  cancel() {
    this.isList = true;
  }
}
