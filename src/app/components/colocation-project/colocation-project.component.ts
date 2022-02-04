import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../domain/project.service";
import {Project, ProjectType} from "../../domain/model/Project";
import {ProjectInputs} from "../../domain/model/ProjectInputs";
import {AuthenticationService} from "../../domain/authentication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-colocation-project',
  templateUrl: './colocation-project.component.html',
  styleUrls: ['./colocation-project.component.scss']
})
export class ColocationProjectComponent implements OnInit {
  constructor(private projectService: ProjectService, private authService: AuthenticationService, private route: ActivatedRoute) {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.project.ownerUid = user.uid
      }
    })

    this.route.pathFromRoot[1].url.subscribe(segment => {
      let projectId = segment[1].path
      if (projectId && projectId != "new") {
        this.projectService.getProjectsById(projectId).then(value => {
          this.project = value
        })
      }

    });
  }

  ngOnInit(): void {
    this.calculateAllFields()
  }

  project: Project = {
    id: null,
    type: ProjectType.COLOC,
    ownerUid: "",
    updated: new Date(),
    name: "Nouveau Projet",
    inputs: <ProjectInputs>{
      nbChambre: 3,
      prixChambre: 300,
      prix: 90000,
      travaux: 0,
      apport: 10000,
      tauxCredit: 1,
      dureeCredit: 25,
      meubles: 10000,
      copro: 0,
      impots: 10,
      tf: 1500,
      pno: 30,
      autre: 0,
      cfe: 30,
      entretien: 0,
    }
  }

  //calculated
  monthlyExpenses: any;
  notaire: number = 0;
  tfMensuelle: number = 0;
  monthlyRent: number = 0;
  totalEmprunte: number = 0;
  cashflow: number = 0;
  gestion: number = 0;
  mensualiteCredit: number = this.PMT();

  calculateAllFields() {

    this.tfMensuelle = this.project.inputs.tf / 12;
    this.monthlyRent = this.project.inputs.nbChambre * this.project.inputs.prixChambre
    this.gestion = Math.round(0.08 * this.monthlyRent);
    this.notaire = 0.08 * this.project.inputs.prix

    this.totalEmprunte = this.project.inputs.travaux
      + this.notaire
      + this.project.inputs.meubles
      + this.project.inputs.prix
      - this.project.inputs.apport;
    this.mensualiteCredit = this.PMT()

    this.monthlyExpenses = this.project.inputs.copro
      + this.project.inputs.impots
      + this.project.inputs.pno
      + this.project.inputs.autre
      + this.tfMensuelle
      + this.project.inputs.cfe
      + this.project.inputs.entretien
      + this.mensualiteCredit
      + this.gestion
    this.cashflow = this.monthlyRent - this.monthlyExpenses
  }


  PMT() {
    let rate = this.project.inputs.tauxCredit / 100 / 12
    let nperiod = this.project.inputs.dureeCredit * 12
    let pv = this.totalEmprunte
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

  getCashflowClassName() {
    let color: string = "red"
    if (this.cashflow > 0) {
      color = "green"
    }
    return "light-" + color + "-input"
  }

  saveProject() {
    this.projectService.createOrUpdateProject(this.project)
  }


}