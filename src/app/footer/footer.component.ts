import { Component, OnInit } from '@angular/core';
import { Main } from '../main';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  main: any = new Main;

  constructor() { }

  ngOnInit() {
  }


}
