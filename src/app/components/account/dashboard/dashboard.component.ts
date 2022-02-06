import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../domain/user.service";
import {AuthenticationService} from "../../../domain/authentication.service";
import {FullUser} from "../../../domain/model/FullUser";
import {Router} from "@angular/router";
import {ProjectService} from "../../../domain/project.service";
import {DomainUser} from "../../../domain/model/DomainUser";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  fullUser: FullUser = <FullUser>{};
  showFiller: any;

  constructor(
    public auth: AuthenticationService,
    public userService: UserService,
    public projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog,
    public datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.userService.getFullUser(user.uid).subscribe(fullUser => {
          this.fullUser = fullUser
        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }


  deleteProject(id: string) {
    let dialogref = this.dialog.open(ConfirmDialogComponent)
    dialogref.afterClosed().subscribe(deleteConfirmed => {
      if (deleteConfirmed) {
        this.projectService.deleteProject(id).then(r => {
        })
      }
    });
  }

  goToProject(id: string) {
    this.router.navigate(['/colocation', id]).then(r => {
    })
  }
}
