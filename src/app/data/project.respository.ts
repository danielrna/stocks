import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import {Project} from "../domain/model/Project";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ProjectInputs} from "../domain/model/ProjectInputs";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProjectRespository {
  constructor(private afs: AngularFirestore) {
  }

  saveProject(project: Project) {
    const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/${project.uid}`);
    return projectRef.set(project, {
      merge: true
    })
  }


  getProjectsByOwnerId(ownerId: string): Observable<Project[]> {
    let collection = this.afs.collection('projects', ref => {
      return ref.where('ownerId', '==', ownerId)
    })

    return collection.snapshotChanges().pipe(
      map(values => {
        return values.map(value => {
          let snap = value.payload.doc.get("projects")
          return this.toDomainProject(snap)
        })
      }))
  }

  private toDomainProjectInputs(project: DocumentSnapshot<unknown>): ProjectInputs {
    return {
      nbChambre: project.get("nbChambre"),
      prixChambre: project.get("prixChambre"),
      prix: project.get("prix"),
      travaux: project.get("travaux"),
      apport: project.get("apport"),
      tauxCredit: project.get("tauxCredit"),
      dureeCredit: project.get("dureeCredit"),
      meubles: project.get("meubles"),
      copro: project.get("copro"),
      impots: project.get("impots"),
      tf: project.get("tf"),
      pno: project.get("pno"),
      autre: project.get("autre"),
      cfe: project.get("cfe"),
      entretien: project.get("entretien"),
    } as ProjectInputs
  }


  private toDomainProject(project: DocumentSnapshot<unknown>): Project {
    return {
      uid: project.get("uid"),
      type: project.get("type"),
      name: project.get("name"),
      ownerUid: project.get("ownerUid"),
      updated: project.get("updated"),
      inputs: this.toDomainProjectInputs(project.get("projectInputs")),
    } as Project;
  }
}
