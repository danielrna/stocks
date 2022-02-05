import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../domain/project.service";

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
