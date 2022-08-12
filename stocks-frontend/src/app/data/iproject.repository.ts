import {Project} from "../domain/model/Project";
import {Observable} from "rxjs";

export interface IProjectRepository {

  createProject(project: Project): Observable<Project>

  updateProject(project: Project): Observable<Project>

  deleteProject(id: string): Promise<void>

  getProjectsByUserId(ownerId: string): Observable<Project[]>

  getProjectById(id: string): Observable<Project>
}
