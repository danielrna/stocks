import {Injectable} from '@angular/core';
import {ProjectRespository} from "../data/project.respository";
import {Project} from "./model/Project";
import {Observable} from "rxjs";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectRespository: ProjectRespository, private toast: ToastService) {
  }

  createProject(project: Project) :Promise<string> {
    return this.projectRespository.createProject(project).then(value => {
      this.toast.showToast("Project Saved", ["success"])
      return value
    })

  }

  getProjectsByOwnerId(id: string): Observable<Project[]> {
    return this.projectRespository.getProjectsByOwnerId(id)
  }
}
