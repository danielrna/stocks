import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {Project} from "../domain/model/Project";
import {Observable} from "rxjs";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {IProjectRepository} from "./iproject.repository";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProjectRespository implements IProjectRepository{
  constructor(private afs: AngularFirestore) {
  }

  createProject(project: Project): Promise<string> {
    const projectRef = this.afs.collection("projects")
    return projectRef.add({...project}).then(added => {
      return added.id
    });

  }

  updateProject(project: Project): Promise<void> {
    return this.afs.collection("projects").doc(project.id!!)
      .update({...project}).then(a => {
        console.log(project)
      })

  }

  deleteProject(id: string): Promise<void> {
    return this.afs.collection("projects").ref.doc(id).delete()

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
      id: project.id,
      type: project.get("type"),
      name: project.get("name"),
      ownerUid: project.get("ownerUid"),
      updated: project.get("updated"),
      inputs: project.get("inputs"),
    } as Project;
  }

  getProjectsById(id: string): Promise<Project> {
    return this.afs.collection('projects').ref
      .doc(id).get().then(value => {
        return this.toDomainProject(value)
      })

  }

  clear() :Observable<Project[]>{
    return new Observable(subscriber => {
      const snapUnsub = this.afs.collection('projects').ref
        .where('id', '==', null).onSnapshot(next => {
          subscriber.next(
            next.docs
              .map(value => {
                console.log()
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
}
