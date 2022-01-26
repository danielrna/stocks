import {Injectable} from "@angular/core";
import {DomainUser} from "../domain/model/DomainUser";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserRepository {
  constructor(private afs: AngularFirestore) {
  }

  saveUser(user: DomainUser) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user, {
      merge: true
    })
  }
}
