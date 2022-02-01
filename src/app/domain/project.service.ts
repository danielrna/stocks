import {Injectable} from '@angular/core';
import {ProjectRespository} from "../data/project.respository";
import {Project} from "./model/Project";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectRespository: ProjectRespository) {
  }

  saveProject(project: Project){
    return this.projectRespository.saveProject(project)

  }

  getProjectsByOwnerId(id: string): Observable<Project[]> {
    return this.projectRespository.getProjectsByOwnerId(id)
  }
}
