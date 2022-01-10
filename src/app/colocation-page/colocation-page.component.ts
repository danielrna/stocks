import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-colocation',
  templateUrl: './colocation-page.component.html',
  styleUrls: ['./colocation-page.component.scss']
})
export class ColocationPageComponent implements OnInit {
  nbroom: number = 3;
  roomprice: number = 300;
  price: number = 90000;
  notaire: number = 0.8 * this.price / 100;

  constructor() {
  }

  ngOnInit(): void {
  }


}
