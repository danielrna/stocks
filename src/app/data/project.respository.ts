import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {Project} from "../domain/model/Project";
import {ProjectInputs} from "../domain/model/ProjectInputs";
import {Observable} from "rxjs";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProjectRespository {
  constructor(private afs: AngularFirestore) {
  }

  createProject(project: Project): Promise<string> {
    const projectRef = this.afs.collection("projects")
    return projectRef.add({...project}).then(added => {
      return added.id
    });

  }


  getProjectsByOwnerId(ownerId: string): Observable<Project[]> {
    return new Observable(subscriber => {
      const snapUnsub = this.afs.collection('projects').ref
        .where('ownerUid', '==', ownerId).onSnapshot(next => {
          subscriber.next(
            next.docs
              .map(value => {
                  return this.toDomainProject(value)
                }
              )
          );
        });
      subscriber.add(() => {
        snapUnsub();
      });
    });

  }

  private toDomainProject(project: DocumentSnapshot<unknown>): Project {
    return {
      id: project.get("uid"),
      type: project.get("type"),
      name: project.get("name"),
      ownerUid: project.get("ownerUid"),
      updated: project.get("updated"),
      inputs:project.get("inputs"),
    } as Project;
  }
}
