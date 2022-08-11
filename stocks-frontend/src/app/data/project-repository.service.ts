import {Injectable} from "@angular/core";
import firebase from "firebase/compat";
import {Project, ProjectType} from "../domain/model/Project";
import {Observable} from "rxjs";
import {IProjectRepository} from "./iproject.repository";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {catchError, tap} from "rxjs/operators";
import {handleError} from "./utils/LoggingUtils";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProjectRepository implements IProjectRepository {

  constructor(private http: HttpClient, private afs: AngularFirestore) {
  }

  private envUrl = "http://localhost:8080";

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin':'*',
      })
  };

  createProject(_project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.envUrl}/project`, _project, this.httpOptions).pipe(
      tap((newP: Project) => console.log(`Project created w/ id=${newP.id}`)),
      catchError(handleError<Project>('createProject'))
    );

  }

  updateProject(_project: Project): Observable<Project> {
    if (_project.id == null) {
      throw Error("Id cannopt be null for update")
    } else {
      return this.http.put<Project>(`${this.envUrl}/projects`, _project, this.httpOptions).pipe(
      )
    }
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
      type: project.get("type") as ProjectType,
      name: project.get("name"),
      ownerId: project.get("ownerUid"),
      updated: project.get("updated"),
      inputs: project.get("inputs"),
    } as Project;
  }

  getProjectsById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.envUrl}/projects/${id}`).pipe(
    );

  }

  clear(): Observable<Project[]> {
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
