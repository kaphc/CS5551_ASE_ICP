import { Component, OnInit } from '@angular/core';
import { ReasonService } from '../../../services/machine/reason.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.css']
})
export class ReasonsComponent implements OnInit {

  reason = {
    "name": "",
    "description": ""
  };
  reasons: any;
  isList: boolean = true;
  isNew: boolean = true;
  constructor(
    private reasonService: ReasonService,
    private toasterService: ToasterService
  ) {
    this.getAllReasons();
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.reason = {
      "name": "",
      "description": ""
    };
  }
  back() {
    this.isList = true;
  }
  populate(reason) {
    this.isList = false;
    this.isNew = false;
    this.reason = reason;
  }

  getAllReasons() {
    this.reasonService.getAllReasons().subscribe(data => {
      this.reasons = data;
    });
  }

  save() {
    if (this.reason.name !== "" && this.reason.description !== "") {
      this.reasonService.addReason(this.reason).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Reason saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getAllReasons();
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
    this.reasonService.deleteReason(this.reason["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Reason deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getAllReasons();
    });
  }
  update() {
    this.reasonService.updateReason(this.reason).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Reason updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getAllReasons();
    });
  }
  cancel() {
    this.isList = true;
  }
}
