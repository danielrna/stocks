import {Injectable} from "@angular/core";
import {Project} from "../domain/model/Project";
import {Observable} from "rxjs";
import {IProjectRepository} from "./iproject.repository";
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {handleError} from "./utils/LoggingUtils";
import {ColocInputs, LcdInputs, ProjectInputs} from "../domain/model/ColocInputs";
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


  createProject(_project: Project): Observable<Project> {
    let type = ''
    if (_project.inputs instanceof ColocInputs) type = 'coloc'
    if (_project.inputs instanceof LcdInputs) type = 'lcd'
    return this.http.post<Project>(`${this.envUrl}/project/${type}`, _project).pipe(
      tap((newP: Project) => console.log(`Project created w/ id=${newP.id}`)),
      catchError(handleError<Project>('createProject'))
    );

  }

  updateProject(_project: Project): Observable<Project> {
    if (_project.id == null) {
      throw Error("Id cannot be null for update")
    } else {
      return this.http.put<Project>(`${this.envUrl}/project/coloc`, _project).pipe(
      )
    }
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.envUrl}/project/${id}`).pipe()

  }


  getProjectsByUserId(_userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.envUrl}/project?userId=${_userId}`).pipe(
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

    return this.http.post<ProjectOutputs>(`${this.envUrl}/project/calculate-outputs`, inputs).pipe(
      tap((newP: ProjectOutputs) => console.log(`Project outputs calculated`)),
      catchError(handleError<ProjectOutputs>('createProject'))
    );

  }

}
