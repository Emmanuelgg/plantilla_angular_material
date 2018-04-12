import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string = 'BIO FARMA';
  lat: number = 19.8178184;
  lng: number = -101.7837827;
  zoom: number = 16;

  constructor() { }

  ngOnInit() {
  }

}
