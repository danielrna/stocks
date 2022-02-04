import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-colocation',
  templateUrl: './colocation-page.component.html',
  styleUrls: ['./colocation-page.component.scss']
})
export class ColocationPageComponent implements OnInit {
  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }


  newColoc() {
    this.router.navigate(["/colocation", "new"])
  }
}
