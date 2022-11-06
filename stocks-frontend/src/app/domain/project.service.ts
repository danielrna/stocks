import {Injectable} from '@angular/core';
import {ProjectRepository} from "../data/project-repository.service";
import {Project} from "./model/Project";
import {Observable} from "rxjs";
import {ProjectInputs} from "./model/ColocInputs";
import {ProjectOutputs} from "./model/ProjectOutputs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectRespository: ProjectRepository) {
  }

  createOrUpdateProject(project: Project): Observable<Project> {
    project.updated = Date.now()
    let obs;
    if (project.id != null) {
      obs = this.projectRespository.updateProject(project)
    } else {
      obs = this.projectRespository.createProject(project)
    }
    return obs.pipe(id => {
      return id
    })

  }

  deleteProject(id: string): Observable<void> {
    return this.projectRespository.deleteProject(id)
  }

  getProjectsByOwnerId(id: string): Observable<Project[]> {
    return this.projectRespository.getProjectsByUserId(id)
  }

  getProjectById(id: string): Observable<Project> {
    return this.projectRespository.getProjectById(id)
  }

  getProjectOutputs(inputs: ProjectInputs): Observable<ProjectOutputs> {
    return this.projectRespository.getProjectOutputs(inputs)
  }

}
