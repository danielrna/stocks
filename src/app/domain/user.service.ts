import {Injectable} from '@angular/core';
import {UserRepository} from "../data/user.respository";
import {FullUser} from "./model/FullUser";
import {ProjectRespository} from "../data/project.respository";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: UserRepository, private projectRepository: ProjectRespository) {
  }

  getFullUser(id: string): Observable<FullUser> {
    let user: any = null;
    this.userRepository.getUser(id).subscribe(value => {
      user = value
    })
    return this.projectRepository.getProjectsByOwnerId(id).pipe(map(projects => {
      return {
        ...user,
        projects: projects
      } as FullUser
    }))
  }


}
