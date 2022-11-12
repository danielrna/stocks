import {Injectable} from "@angular/core";
import {ProjectService} from "../../../domain/project.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EMPTY} from "rxjs";
import {deleteProject, deleteProjectSuccess, getProjects, getProjectsSuccess} from "../actions/project.actions";
import {Project} from "../../../domain/model/Project";
import {ToastService} from "../../../domain/toast.service";

@Injectable()
export class ProjectEffects {


  constructor(private actions$: Actions, private service: ProjectService, private toastService: ToastService) {
  }

  loadProjects = createEffect(() =>
    this.actions$.pipe(
      ofType(getProjects),
      mergeMap((action) => {
        return this.service.getProjectsByOwnerId(action["userId"]).pipe(
          map((response: Project[]) => getProjectsSuccess({projects: response})),
          catchError(() => EMPTY),
        )
      })
    )
  )

  deleteProject = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProject),
      mergeMap((action) => {
        return this.service.deleteProject(action["projectId"]).pipe(
          map(() => {
            this.toastService.showToast("Project Deleted", ["success"])
            return deleteProjectSuccess()
          }),
          catchError(() => EMPTY),
        )
      })
    )
  )


}
