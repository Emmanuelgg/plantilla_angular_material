import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';





// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

// Import material.angular
// Import Dialog module


//import materil.angular animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//import matreail.angular
import { MaterialModule } from './material/material.module'

//Import dialog module
import { DialogsModule } from './dialogs/dialogs.module';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './/app-routing.module';

//Import component
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';

import { ProductsService }          from './products.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent
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
    BrowserAnimationsModule,
    DialogsModule,
    MaterialModule
  ],
  exports: [
  ],
  providers: [
      DataService,
      ProductsService,
      Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
