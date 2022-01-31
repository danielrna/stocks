import {Injectable} from '@angular/core';
import {ProjectRespository} from "../data/project.respository";
import {DomainProject} from "./model/DomainProject";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectRespository: ProjectRespository) {
  }

  getProjectsByOwnerId(id: string): Promise<DomainProject[]> {
    return this.projectRespository.getProjectsByOwnerId(id).then((projects: DomainProject[]) => {
      return projects
    })
  }
}
