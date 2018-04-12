import { Component, OnInit, Input } from '@angular/core';
import { Main } from '../main';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  main: any = new Main;

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
      $(".button-collapse").sideNav();

      $('.dropdown-button').dropdown();

  }
}
