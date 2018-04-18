import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Product } from './product';
import { PRODUCTS } from './mock-products';

@Injectable()
export class ProductsService {

  constructor() { }

  getProducts(): Observable<Product[]> {

    return of(PRODUCTS);
  }

  getProduct(id: number): Observable<Product> {
   return of(PRODUCTS.find(product => product.id === id));
 }

}
