import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-products';

import { Product } from '../product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    products = PRODUCTS;

  constructor() { }

  ngOnInit() {
  }


}
