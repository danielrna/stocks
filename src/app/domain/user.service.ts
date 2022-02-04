import {Injectable} from '@angular/core';
import {UserRepository} from "../data/user.respository";
import {FullUser} from "./model/FullUser";
import {ProjectRespository} from "../data/project.respository";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: UserRepository, private projectRepository: ProjectRespository) {
  }

  getFullUser(id: string): Observable<FullUser> {
    let obs1 = this.userRepository.getUser(id)
    let obs2 = this.projectRepository.getProjectsByOwnerId(id)

    return combineLatest([obs1, obs2]).pipe(source =>
      source.pipe().pipe(map(value => {
        return {
          ...value[0],
          projects: value[1]
        } as FullUser
      })))
  }


}
