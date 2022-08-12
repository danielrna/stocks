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
      return this.http.put<Project>(`${this.envUrl}/project`, _project, this.httpOptions).pipe(
      )
    }
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.envUrl}/project/${id}`, this.httpOptions).pipe()

  }


  getProjectsByUserId(_userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.envUrl}/project?userId=${_userId}`, this.httpOptions).pipe(
      tap((_projects: Project[]) => console.log(`${_projects.length} projects retrived`)),
      catchError(handleError<Project[]>('getProjectsByUserId'))
    );
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

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.envUrl}/project/${id}`).pipe(
      tap((_project: Project) => console.log(`Project retrived w/ id ${_project.id}`)),
      catchError(handleError<Project>('getProjectById'))
    );

  }

}
