import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../domain/user.service";
import {AuthenticationService} from "../../../domain/authentication.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../../domain/project.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {DatePipe} from "@angular/common";
import {Project, ProjectType} from "../../../domain/model/Project";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  showFiller: any;
  displayedColumns: string[] = ['name', 'type', 'updated', 'actions'];

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
        this.projectService.getProjectsByOwnerId(user.uid).subscribe(projects => {
          this.projects = projects
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

  getName(type: number): string {
    switch (type) {
      case ProjectType.COLOC:
        return "Colocation"
      case ProjectType.LCD:
        return "Location courte durée"
      default:
        return "Inconnu"
    }
  }
}
