import {Project} from "./Project";
import {DomainUser} from "./DomainUser";

export interface FullUser extends DomainUser {
  projects: Project[]
}
