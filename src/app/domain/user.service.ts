import {Injectable} from '@angular/core';
import {UserRepository} from "../data/user.respository";
import {FullUser} from "./model/FullUser";
import {ProjectRespository} from "../data/project.respository";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {DomainUser} from "./model/DomainUser";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRepository: UserRepository, private projectRepository: ProjectRespository, private toastService: ToastService) {
  }

  saveUser(user: DomainUser) {
    return this.userRepository.saveUser(user).then(() => {
      this.toastService.showToast("User Saved", ["success"])
    })
  }


  getFullUser(id: string): Observable<FullUser> {
    let obs1 = this.userRepository.getUser(id)
    let obs2 = this.projectRepository.getProjectsByOwnerId(id)

    return combineLatest([obs1, obs2]).pipe(source =>
      source.pipe(map(value => {
        return {
          ...value[0],
          projects: value[1]
        } as FullUser
      })))
  }


}
