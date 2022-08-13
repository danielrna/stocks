import {Injectable} from '@angular/core';
import {ProjectRepository} from "../data/project-repository.service";
import {Project} from "./model/Project";
import {Observable} from "rxjs";
import {ProjectInputs} from "./model/ProjectInputs";
import {ProjectOutputs} from "./model/ProjectOutputs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectRespository: ProjectRepository) {
  }

  createOrUpdateProject(project: Project): Observable<Project> {
    project.updated = Date.now()
    let obs;
    if (project.id != null) {
      obs = this.projectRespository.updateProject(project)
    } else {
      obs = this.projectRespository.createProject(project)
    }
    return obs.pipe(id => {
      return id
    })

  }

  deleteProject(id: string): Observable<void> {
    return this.projectRespository.deleteProject(id)
  }

  getProjectsByOwnerId(id: string): Observable<Project[]> {
    return this.projectRespository.getProjectsByUserId(id)
  }

  getProjectById(id: string): Observable<Project> {
    return this.projectRespository.getProjectById(id)
  }

  getProjectOutputs(inputs: ProjectInputs): Observable<ProjectOutputs> {
    return this.projectRespository.getProjectOutputs(inputs)
  }

  calculate(inputs: ProjectInputs): ProjectOutputs {

    let outputs = <ProjectOutputs>{}
    outputs.tfMensuelle = inputs.tf / 12;
    outputs.monthlyRent = (inputs.nbChambre * inputs.prixChambre) * (12 - inputs.vacance) / 12
    outputs.gestion = Math.round(0.08 * outputs.monthlyRent);
    outputs.notaire = 0.08 * inputs.prix

    outputs.totalEmprunte = inputs.travaux
      + outputs.notaire
      + inputs.meubles
      + inputs.prix
      + inputs.chasse
      - inputs.apport;
    outputs.creditMensuel = this.PMT(inputs.tauxCredit, inputs.dureeCredit, outputs.totalEmprunte)

    outputs.monthlyExpenses = inputs.copro
      + inputs.impots
      + inputs.pno
      + inputs.autre
      + outputs.tfMensuelle
      + inputs.cfe
      + inputs.entretien
      + outputs.creditMensuel
      + outputs.gestion


    outputs.cashflow = outputs.monthlyRent - outputs.monthlyExpenses
    outputs.cashflowAfterCredit = outputs.cashflow - outputs.creditMensuel
    outputs.rendementBrut = Math.round(outputs.monthlyRent * 12 / inputs.prix * 100)
    outputs.rendementNet = Math.round((outputs.cashflow + outputs.creditMensuel) * 12 / outputs.totalEmprunte * 100)
    return outputs
  }

  ///

  PMT(taux: number, dureeAnnees: number, totalEmprunte: number) {
    let rate = taux / 100 / 12
    let nperiod = dureeAnnees * 12
    let pv = totalEmprunte
    let fv = 0;
    let type = 1;

    if (rate == 0) return -(pv + fv) / nperiod;

    const pvif = Math.pow(1 + rate, nperiod);
    let pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
      pmt /= (1 + rate);
    }

    return Math.round(-pmt);
  }
}
