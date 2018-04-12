import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { DataService } from '../data.service';

import { CurrencyPipe } from '@angular/common';

import { Methods } from '../methods'
import { Main } from '../main'

declare var jquery:any;
declare var $ :any


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  main: any = new Main;
  methods: any;
  response: any;
  products: Array<any>;

  @ViewChildren('imagesProducts') carousel: QueryList<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    this.methods = new Methods(_dataService);

    //start get full table
    this._dataService.getTable('getAll','products', { _id: -1 }, 100)
        .subscribe(res => {
            this.response = res;
            this.products = res.data;
        });
    //end get full table

    // Access the Data Service's getProducts() method we defined

    // this._dataService.getTable('get','products',{_id:-1},100)
    //     .subscribe(res => this.products = res);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.carousel.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
    this.initSales();
  }

  initSales(){
     $('.materialboxed').materialbox();
  }

}
