import {Injectable} from "@angular/core";
import {DomainUser} from "../domain/model/DomainUser";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {IUserRepository} from "./iuser.repository";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserRepository implements IUserRepository {
  constructor(private afs: AngularFirestore) {
  }

  saveUser(user: DomainUser): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user, {
      merge: true
    })
  }

  getUser(uid: string): Observable<DomainUser> {
    return this.afs.collection("users").doc(uid).snapshotChanges().pipe(
      map(snap => {
        if (!snap.payload) {
          throw Error("User not found")
        } else {
          return UserRepository.toDomain(snap.payload)
        }
      }))

  }

  private static toDomain(user: DocumentSnapshot<unknown>) {
    return {
      uid: user.get("uid"),
      email: user.get("email"),
      displayName: user.get("displayName"),
      photoURL: user.get("photoURL"),
      emailVerified: user.get("emailVerified"),
    } as DomainUser;
  }
}
