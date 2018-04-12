import { Component, OnInit, ViewChild} from '@angular/core';

import { DataService } from '../data.service';
import { DialogsService } from '../dialogs/dialogs.service';

import { DataSource } from '@angular/cdk/collections';

import { NgForm } from '@angular/forms';

import { CurrencyPipe } from '@angular/common';

import { Main } from '../main';

import { Methods } from '../methods'

import { Title }     from '@angular/platform-browser';

declare var Materialize: any;

//materialize.angular
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';


declare var jquery:any;
declare var $ :any

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  main: any = new Main;
  methods: any;
  dialog: any;
  valueCurrency : string = '0';
  files: FileList;
  response: any;
  products: Array<any>;
  displayedColumns = ['name','description','amount', 'action'];
  dataSource: any;
  formAdminProducts: NgForm;


  constructor(private _dataService: DataService, private dialogsService: DialogsService, private titleService: Title ) {
      this.methods = new Methods(_dataService);
      this.titleService.setTitle( "Administracion de productos" );
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $('.modal').modal();
    $('ul.tabs').tabs();
  }

  getProducts(){
    this._dataService.getTable('getAll','products', { _id: -1 }, 100)
        .subscribe(res => {
            this.response = res;
            this.products = res.data;
            this.dataSource = new MatTableDataSource(this.products);
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

  //filter to table products
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //click to row
  onSelectClicked(row) {
    this._dataService.getItem('getOne','products', row._id, {_id:-1} , 1)
        .subscribe(res => {
            var response = res;
            if (response.status == 1 && response.ok == true) {
                Materialize.toast(response.message.success, 5000, this.main.toastSuccessColor);
                //this.formAdminProducts.value(response.data[0]);
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
                          this._dataService.deleteItem('delete','products', row._id)
                              .subscribe(res => {
                                  var response = res;
                                  if (response.status == 1 && response.ok == true) {
                                      Materialize.toast(response.message.success+' '+' el producto', 5000, this.main.toastSuccessColor);
                                      this.getProducts();
                                  } else {
                                      Materialize.toast(response.message.error, 5000, this.main.toastDangerColor);
                                  }
                              });
                      }
                  }
        );
  }


   // this._dataService.addProduct(formAdminProducts.form.value)
   //     .subscribe(res => this.message = res);

   // this._dataService.uploadFiles(this.files)
   //     .subscribe(res => this.message = res);

   // console.log(formAdminProducts.value);
   // this._dataService.postUploadFiles()
   //     .subscribe(res => res = res);

}
