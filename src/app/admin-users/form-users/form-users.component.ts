import { Component, OnInit, ViewChild} from '@angular/core';

import { DataService } from '../../data.service';
import { DialogsService } from '../../dialogs/dialogs.service';

import { DataSource } from '@angular/cdk/collections';

import { NgForm , FormGroup} from '@angular/forms';

import { CurrencyPipe } from '@angular/common';

import { Main } from '../../main';

import { Methods } from '../../methods'

declare var Materialize: any;

//materialize.angular
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';


declare var jquery:any;
declare var $ :any

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css']
})
export class FormUsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  main: any = new Main;
  methods: any;
  dialog: any;
  valueCurrency : string = '0';
  files: FileList;
  response: any;
  users: Array<any>;
  displayedColumns = ['name', 'action'];
  dataSource: any;


  constructor(private _dataService: DataService, private dialogsService: DialogsService ) {
      this.methods = new Methods(_dataService);
  }

  ngOnInit() {
      $('.modal').modal();
  }

  getUsers(){
    this._dataService.getTable('getAll','admins', { _id: -1 }, 100)
        .subscribe(res => {
            this.response = res;
            this.users = res.data;
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
  }
  onChange(searchValue : string ) {
      if(searchValue.substring(0,1)=='$')
          this.valueCurrency = searchValue.substring(1);
      else
          this.valueCurrency = searchValue;
  }

  getValueChange(){
    return this.valueCurrency;
  }

  //filter to table users
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //click to row
  onSelectClicked(row, form) {
    this._dataService.getItem('getOne','admins', row._id, {_id:-1} , 1)
        .subscribe(res => {
            var response = res;
            if (response.status == 1 && response.ok == true) {
                Materialize.toast(response.message.success, 5000, this.main.toastSuccessColor);
                var data = response.data[0];
                delete data.type;
                //console.log(data.urlFile);
                data.filePath = "";
                delete data.pathImagesResources;
                form.setValue(data);
                 $('#userListModal').modal('close');
                 Materialize.updateTextFields();
            } else {
                Materialize.toast(response.message.error, 5000, this.main.toastDangerColor);
            }
        });
  }

  onDeleteClicked(row) {
      //this.methods.deleteItem('delete', row._id, ' el producto');
      this.dialogsService
        .confirm('Confirmación', '¿Realmente deseas eliminar el producto '+row.name+'?')
        .subscribe(res => {
                      var response = res;
                      if (response) {
                          this._dataService.deleteItem('delete','admins', row._id)
                              .subscribe(res => {
                                  var response = res;
                                  if (response.status == 1 && response.ok == true) {
                                      Materialize.toast(response.message.success+' '+' el usuario', 5000, this.main.toastSuccessColor);
                                      this.getUsers();
                                  } else {
                                      Materialize.toast(response.message.error, 5000, this.main.toastDangerColor);
                                  }
                              });
                      }
                  }
        );
  }

   // this._dataService.addProduct(formAdminUsers.form.value)
   //     .subscribe(res => this.message = res);

   // this._dataService.uploadFiles(this.files)
   //     .subscribe(res => this.message = res);

   // console.log(formAdminUsers.value);
   // this._dataService.postUploadFiles()
   //     .subscribe(res => res = res);

}
