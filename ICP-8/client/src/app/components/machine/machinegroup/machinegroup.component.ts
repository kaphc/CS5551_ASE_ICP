import { Component, OnInit } from '@angular/core';
import { MachinegroupService } from '../../../services/machine/machinegroup.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-machinegroup',
  templateUrl: './machinegroup.component.html',
  styleUrls: ['./machinegroup.component.css']
})
export class MachinegroupComponent implements OnInit {

  machinegroup = {
    "name": "",
    "description": ""
  };
  machinegroups: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor(
    private machinegroupService: MachinegroupService,
    private toasterService: ToasterService
  ) {
    this.getAllMachineGroups();
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.machinegroup = {
      "name": "",
      "description": ""
    };
  }
  back() {
    this.isList = true;
  }
  populate(machinegroup) {
    this.isList = false;
    this.isNew = false;
    this.machinegroup = machinegroup;
  }

  getAllMachineGroups() {
    this.machinegroupService.getMachineGroups().subscribe(data => {
      this.machinegroups = data;
    });
  }

  save() {
    if (this.machinegroup.name !== "" && this.machinegroup.description !== "") {
      this.machinegroupService.addMachineGroup(this.machinegroup).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Machine group saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getAllMachineGroups();
      });
    }else{
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
    this.machinegroupService.deleteMachineGroup(this.machinegroup["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Machine group deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getAllMachineGroups();
    });
  }
  update() {
    this.machinegroupService.updateMachineGroup(this.machinegroup).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Machine group updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getAllMachineGroups();
    });
  }
  cancel() {
    this.isList = true;
  }

}
