import {Project} from "../domain/model/Project";
import {Observable} from "rxjs";

export interface IProjectRepository {

  createProject(project: Project): Promise<string>

  updateProject(project: Project): Promise<string>

  deleteProject(id: string): Promise<void>

  getProjectsByOwnerId(ownerId: string): Observable<Project[]>

  getProjectsById(id: string): Promise<Project>
}
