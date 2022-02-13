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

  createOrUpdateProject(project: Project): Promise<string> {
    project.updated = Date.now()
    let promise;
    if (project.id != null) {
      promise = this.projectRespository.updateProject(project)
    } else {
      promise = this.projectRespository.createProject(project)
    }
    return promise.then(id => {
      this.toast.showToast("Project Saved", ["success"])
      return id
    })

  }

  deleteProject(id: string) {
    return this.projectRespository.deleteProject(id).then(() => {
      this.toast.showToast("Project Deleted", ["success"])
    })
  }

  getProjectsByOwnerId(id: string): Observable<Project[]> {
    return this.projectRespository.getProjectsByOwnerId(id)
  }

  getProjectsById(id: string): Promise<Project> {
    return this.projectRespository.getProjectsById(id)
  }

  clearProjects() {
    this.projectRespository.clear().subscribe(value => {
      value.forEach(value1 => {
        this.projectRespository.deleteProject(value1.id!!).then(r =>{} )
      })
    })
  }
}
