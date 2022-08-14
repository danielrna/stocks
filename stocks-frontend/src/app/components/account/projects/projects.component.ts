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
  projects: Project[] = [];
  displayedColumns: string[] = ['name', 'type', 'netprofit', 'updated', 'actions'];
  toApiProjectType = toApiProjectType

  constructor(
    public auth: AuthenticationService,
    public projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private toast: ToastService,
  ) {

  }

  ngOnInit(): void {
    this.refreshProjects();
  }


  private refreshProjects() {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.projectService.getProjectsByOwnerId(user.uid).subscribe(projects => {
          this.projects = projects
        })
      } else this.router.navigate(["login"]).then(r => {
        // TODO document why this arrow function is empty

      })
    })
  }

  deleteProject(id: string) {
    let dialogref = this.dialog.open(ConfirmDialogComponent)
    dialogref.afterClosed().subscribe(deleteConfirmed => {
      if (deleteConfirmed) {
        this.projectService.deleteProject(id).subscribe(() => {
          this.toast.showToast("Project Deleted", ["success"])
          this.refreshProjects()
        })
      }
    });
  }

  goToProject(id: string) {
    this.router.navigate(['/colocation', id]).then(r => {
    })
  }

}

export function toApiProjectType(type: string): string {
  switch (type) {
    case ProjectType[ProjectType.COLOC]:
      return "Colocation"
    case ProjectType[ProjectType.LCD]:
      return "Location courte durée"
    case ProjectType[ProjectType.IDR]:
      return "Immeuble de rapport"
    default:
      return "Inconnu"
  }
}
