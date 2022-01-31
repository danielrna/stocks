import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {DomainProject} from "../domain/model/DomainProject";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {Observable} from "rxjs";

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


  getProjectsByOwnerId(ownerId: string): Promise<DomainProject[]> {
    let collection = this.afs.collection('projects', ref => {
      return ref.where('ownerId', '==', ownerId)
    }).ref

    return collection.get().then(qs => {
      return qs.docs.map(qds => {
        return ProjectRespository.toDomain(qds.get("projects"))
      })
    })
  }


  private static toDomain(project: DocumentSnapshot<unknown>): DomainProject {
    return {
      uid: project.get("uid"),
      type: project.get("type"),
      ownerUid: project.get("ownerUid"),
      properties: project.get("properties"),
    } as DomainProject;
  }
}
