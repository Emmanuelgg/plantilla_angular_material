import { Injectable } from '@angular/core';

import { Main } from './main';

import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  main: any = new Main;
  result:any;

  constructor(private _http: Http) { }

  addToTable(url:string, form:any, collectionName:string) : Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var data = {form:form,collectionName:collectionName};
    return this._http.post(this.main.pathDB+url, data, options)
      .map( result  => {return result.json()})
      .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  getTable(url:string,collectionName:string,order:any, limit) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var data = {collectionName:collectionName, limit:limit, order:order};
    return this._http.post(this.main.pathDB+url,data,options)
      .map(result => this.result = result.json().response)
      .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  getItem(url:string, collectionName:string, id:any, order:any, limit) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var data = {collectionName:collectionName, id:id, limit:limit, order:order};
    return this._http.post(this.main.pathDB+url,data,options)
      .map(result => this.result = result.json().response)
      .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  uploadFiles(method,files:any, pathFile: String) {
    var data = {pathFile:pathFile, files:files};
    return this._http.post(this.main.pathDB+method, files)
      .map(files => files.json())
      .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  deleteItem(url:string, collectionName:string, id:any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var data = {collectionName:collectionName, id:id};
    return this._http.post(this.main.pathDB+url,data,options)
      .map(result => this.result = result.json().response)
      .catch( (error: any) => Observable.throw(error.json().error || 'server error') );
  }

  // getLastProducts() {
  //   return this._http.get(this.main.pathDB+"lastProducts")
  //     .map(result => this.result = result.json().response.data);
  // }



  // addProduct(form:any) : Observable<any> {
  //   console.log(form);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this._http.post(this.main.pathDB+"addProduct", form, options)
  //     .map(result => this.result = result.json().response.data);
  // }



}
