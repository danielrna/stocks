import {Injectable} from '@angular/core';
import {ProjectRespository} from "../data/project.respository";
import {DomainProject} from "./model/DomainProject";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectRespository: ProjectRespository) {
  }

  getProjectsByOwnerId(id: string): Observable<DomainProject[]> {
    return this.projectRespository.getProjectsByOwnerId(id)
  }
}
