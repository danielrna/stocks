import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {DomainProject} from "../domain/model/DomainProject";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProjectRespository {
  constructor(private afs: AngularFirestore) {
  }

  saveUser(user: DomainProject) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user, {
      merge: true
    })
  }


  getProjectsByOwnerId(ownerId: string): Observable<DomainProject[]> {
    let collection = this.afs.collection('projects', ref => {
      return ref.where('ownerId', '==', ownerId)
    })

    return collection.snapshotChanges().pipe(
      map(values => {
        return values.map(value => {
          let snap = value.payload.doc.get("projects")
          return ProjectRespository.toDomain(snap)
        })
      }))
  }


  private static toDomain(project: DocumentSnapshot<unknown>): DomainProject {
    return {
      uid: project.get("uid"),
      type: project.get("type"),
      name: project.get("name"),
      ownerUid: project.get("ownerUid"),
      updated: project.get("updated"),
    } as DomainProject;
  }
}
