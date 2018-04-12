import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';



import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { ContactComponent } from './contact/contact.component';


import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './/app-routing.module';
import { SalesComponent } from './sales/sales.component';
import { DateComponent } from './date/date.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AdminProductsComponent } from './admin-products/admin-products.component';
import { FormProductsComponent } from './admin-products/form-products/form-products.component'
import { ListProductsComponent } from './admin-products/list-products/list-products.component'

import { AdminUsersComponent } from './admin-users/admin-users.component';
import { FormUsersComponent } from './admin-users/form-users/form-users.component'

// Import material.angular
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
         MatSortModule, MatTableModule } from "@angular/material";
// Import Dialog module
import {MatDialogModule} from '@angular/material/dialog';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
//import materil.angular animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//Import dialog module
import { DialogsModule } from './dialogs/dialogs.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapComponent,
    ContactComponent,
    SalesComponent,
    DateComponent,
    MenuComponent,
    FooterComponent,
    AdminProductsComponent,
    FormProductsComponent,
    ListProductsComponent,
    AdminUsersComponent,
    FormUsersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDuSBrONzdoZ_EPoWhM8btDW-Er7oldCIU'
    }),
    HttpModule,
    AppRoutingModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    DialogsModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
      DataService,
      Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
