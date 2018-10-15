import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../services/machine/machine.service';
import { AreaService } from '../../../services/machine/area.service';
import { LineService } from '../../../services/machine/line.service';
import { MachinegroupService } from '../../../services/machine/machinegroup.service';
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  machine = {
    "name": "",
    "machinegroup": "",
    "company": "",
    "model": "",
    "dateOfInstall": "",
    "qrCode": "",
    "area": "",
    "line": "",
    "barcode": ""
  };
  machines: any;
  isList: boolean = true;
  isNew: boolean = true;
  areaList: any;
  lineList: any;
  machinegroupList: any;
  constructor(
    private machineService: MachineService,
    private areaService: AreaService,
    private lineService: LineService,
    private machinegroupService: MachinegroupService,
    private toasterService: ToasterService
  ) {
    this.getMachines();
    this.areaService.getAreas().subscribe(data => {
      this.areaList = data;
    });
    this.lineService.getLines().subscribe(data => {
      this.lineList = data;
    });
    this.machinegroupService.getMachineGroups().subscribe(data => {
      this.machinegroupList = data;
    });
  }

  ngOnInit() {
  }

  new() {
    this.isList = false;
    this.isNew = true;
    this.machine = {
      "name": "",
      "machinegroup": "",
      "company": "",
      "model": "",
      "dateOfInstall": "",
      "qrCode": "",
      "area": "",
      "line": "",
      "barcode": ""
    };
  }
  back() {
    this.isList = true;
  }
  populate(machine) {
    this.isList = false;
    this.isNew = false;
    this.machine = machine;
    this.machine.area = machine.area._id;
    this.machine.line = machine.line._id;
    this.machine.machinegroup = machine.machinegroup._id;
  }

  getMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    });
  }
  generateQR() {
    this.machine.qrCode = "{ machineName :" + this.machine.name + ",area:" + this.machine.area + ",line:" + this.machine.line + "}";
  }
  save() {
    if (this.machine.name !== "" && this.machine.machinegroup !== ""
      && this.machine.dateOfInstall !== "" && this.machine.area !== "" && this.machine.line !== "") {
      this.machineService.addMachine(this.machine).subscribe(data => {
        var toast: Toast = {
          type: 'success',
          title: 'Success',
          body: 'Machine saved successfully.',
          showCloseButton: true
        };
        this.toasterService.pop(toast);
        this.isList = true;
        this.getMachines();
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
  delete() {
    this.machineService.deleteMachine(this.machine["_id"]).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Machine deleted successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getMachines();
    });
  }
  update() {
    this.machineService.updateMachine(this.machine).subscribe(data => {
      var toast: Toast = {
        type: 'success',
        title: 'Success',
        body: 'Machine updated successfully.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
      this.isList = true;
      this.getMachines();
    });
  }
  print() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
  cancel() {
    this.isList = true;
  }
}
