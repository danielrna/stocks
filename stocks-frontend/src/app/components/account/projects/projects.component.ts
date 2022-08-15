import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../../domain/project.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {DatePipe} from "@angular/common";
import {Project, ProjectType} from "../../../domain/model/Project";
import {ToastService} from "../../../domain/toast.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
  }


}
