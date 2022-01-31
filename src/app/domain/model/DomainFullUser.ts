import {DomainProject} from "./DomainProject";
import {DomainUser} from "./DomainUser";

export interface DomainFullUser extends DomainUser {
  projects: DomainProject[]
}
