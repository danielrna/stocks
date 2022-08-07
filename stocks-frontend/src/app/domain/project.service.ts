import {Injectable} from '@angular/core';
import {ProjectRepository} from "../data/project-repository.service";
import {Project} from "./model/Project";
import {Observable} from "rxjs";
import {ToastService} from "./toast.service";
import {ProjectInputs} from "./model/ProjectInputs";
import {ProjectOutputs} from "./model/ProjectOutputs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private projectRespository: ProjectRepository, private toast: ToastService) {
  }

  createOrUpdateProject(project: Project): Promise<string> {
    project.updated = Date.now()
    let promise;
    if (project.id != null) {
      promise = this.projectRespository.updateProject(project)
    } else {
      promise = this.projectRespository.createProject(project)
    }
    return promise.then(id => {
      this.toast.showToast("Project Saved", ["success"])
      return id
    })

  }

  deleteProject(id: string) {
    return this.projectRespository.deleteProject(id).then(() => {
      this.toast.showToast("Project Deleted", ["success"])
    })
  }

  getProjectsByOwnerId(id: string): Observable<Project[]> {
    return this.projectRespository.getProjectsByOwnerId(id)
  }

  getProjectsById(id: string): Promise<Project> {
    return this.projectRespository.getProjectsById(id)
  }

  clearProjects() {
    this.projectRespository.clear().subscribe(value => {
      value.forEach(value1 => {
        this.projectRespository.deleteProject(value1.id!!).then(r => {
        })
      })
    })
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
    outputs.mensualiteCredit = this.PMT(inputs.tauxCredit, inputs.dureeCredit, outputs.totalEmprunte)

    outputs.monthlyExpenses = inputs.copro
      + inputs.impots
      + inputs.pno
      + inputs.autre
      + outputs.tfMensuelle
      + inputs.cfe
      + inputs.entretien
      + outputs.mensualiteCredit
      + outputs.gestion


    outputs.cashflow = outputs.monthlyRent - outputs.monthlyExpenses
    outputs.cashflowNoCredit = outputs.cashflow - outputs.mensualiteCredit
    outputs.rendementBrut = Math.round(outputs.monthlyRent * 12 / inputs.prix * 100)
    outputs.rendementNet = Math.round((outputs.cashflow + outputs.mensualiteCredit) * 12 / outputs.totalEmprunte * 100)
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
