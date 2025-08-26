import { Component } from '@angular/core';
import { Map } from "./map/map";
import { Details } from "./details/details";

@Component({
  selector: 'app-main',
  imports: [Map, Details],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
