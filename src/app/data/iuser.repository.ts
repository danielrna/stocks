import {Observable} from "rxjs";
import {DomainUser} from "../domain/model/DomainUser";

export interface IUserRepository {

  saveUser(user: DomainUser): Promise<void>

  getUser(uid: string): Observable<DomainUser>

}
