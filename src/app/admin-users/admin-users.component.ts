import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import { NgForm } from '@angular/forms';

import { CurrencyPipe } from '@angular/common';

import { Main } from '../main';

import { Methods } from '../methods'

import { Title }     from '@angular/platform-browser';

//materialize.angular
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  main: any = new Main;
  methods: any;
  valueCurrency : string = '0';

  constructor(private _dataService: DataService, private titleService: Title) {
      this.methods = new Methods(_dataService);
      this.titleService.setTitle( "Gestion de administradores" );
  }

  ngOnInit() {
  }



}
