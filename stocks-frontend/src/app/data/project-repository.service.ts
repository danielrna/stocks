import {Injectable} from "@angular/core";
import {Project} from "../domain/model/Project";
import {Observable} from "rxjs";
import {IProjectRepository} from "./iproject.repository";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {handleError} from "./utils/LoggingUtils";
import {ProjectInputs} from "../domain/model/ProjectInputs";
import {ProjectOutputs} from "../domain/model/ProjectOutputs";
import {envUrl} from "./utils/GlobalConstants";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProjectRepository implements IProjectRepository {
  private envUrl: string = envUrl;

  constructor(private http: HttpClient) {
  }


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
      throw Error("Id cannot be null for update")
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


  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.envUrl}/project/${id}`).pipe(
      tap((_project: Project) => console.log(`Project retrived w/ id ${_project.id}`)),
      catchError(handleError<Project>('getProjectById'))
    );

  }

  getProjectOutputs(inputs: ProjectInputs): Observable<ProjectOutputs> {

    return this.http.post<ProjectOutputs>(`${this.envUrl}/project/calculateOutputs`, inputs, this.httpOptions).pipe(
      tap((newP: ProjectOutputs) => console.log(`Project outputs calculated`)),
      catchError(handleError<ProjectOutputs>('createProject'))
    );

  }

}
