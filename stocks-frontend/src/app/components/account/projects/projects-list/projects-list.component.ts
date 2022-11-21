import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../domain/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../confirm-dialog/confirm-dialog.component";
import {DatePipe} from "@angular/common";
import {Project, ProjectType} from "../../../../domain/model/Project";
import {deleteProject, getProjects} from "../../../../store/project/actions/project.actions";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {SelfProjectState} from "../../../../store/project/projectState";
import {selectProjects} from "../../../../store/project/selectors/project.selectors";
import {DomainUser} from "../../../../domain/model/DomainUser";
import {selectUser} from "../../../../store/user/selectors/user.selectors";
import {SelfRootState} from "../../../../store/user/rootState";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projects: Observable<Project[]> = this.projectStore.pipe(select(selectProjects))
  currentUser: Observable<DomainUser | null> = this.rootStore.pipe(select(selectUser))

  displayedColumns: string[] = ['name', 'type', 'netprofit', 'updated', 'actions'];
  toApiProjectType = toApiProjectType

  constructor(
    private projectStore: Store<SelfProjectState>,
    private rootStore: Store<SelfRootState>,
    public auth: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    public datePipe: DatePipe,
  ) {

  }

  ngOnInit(): void {
    this.fetchUserProjects();
  }


  private fetchUserProjects() {
    this.currentUser.subscribe(user => {
      if (user !== null) {
        this.projectStore.dispatch(getProjects({userId: user?.uid!!}));

      } else this.router.navigate(["login"]).then(r => {
        // TODO document why this arrow function is empty

      })
    })
  }

  deleteProject(id: string) {
    let dialogref = this.dialog.open(ConfirmDialogComponent)
    dialogref.afterClosed().subscribe(deleteConfirmed => {
      if (deleteConfirmed) {
        this.projectStore.dispatch(deleteProject({projectId: id}));
        this.fetchUserProjects()
      }
    });
  }

  goToProject(id: string) {
    this.router.navigate(['/account/projects/colocation', id]).then(r => {
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
