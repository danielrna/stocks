import {DomainProperty} from "./DomainProperty";

export interface DomainProject {
  uid: string;
  type: string;
  ownerUid:string;
  properties: DomainProperty[];
}
