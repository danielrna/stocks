import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../domain/project.service";
import {Project, ProjectType} from "../../domain/model/Project";
import {ProjectInputs} from "../../domain/model/ProjectInputs";
import {AuthenticationService} from "../../domain/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectOutputs} from "../../domain/model/ProjectOutputs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-colocation-project',
  templateUrl: './colocation-project.component.html',
  styleUrls: ['./colocation-project.component.scss']
})
export class ColocationProjectComponent implements OnInit {

  project: Project = <Project>{
    id: null,
    type: ProjectType.Colocation,
    ownerId: "",
    updated: Date.now(),
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
      chasse: 0,
      vacance: 1.5,
    }
  }

  //calculated
  outputs = <ProjectOutputs>{
    monthlyExpenses: 0,
    notaire: 0,
    tfMensuelle: 0,
    monthlyRent: 0,
    totalEmprunte: 0,
    cashflow: 0,
    gestion: 0,
    mensualiteCredit: 0,
    rendementBrut: 0,
    rendementNet: 0,
  }

  ngOnInit(): void {
    this.calculateAllFields()
  }

  constructor(private projectService: ProjectService,
              private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.project.ownerId = user.uid
      }
    })

    this.route.pathFromRoot[1].url.subscribe(segment => {
      let projectId = segment[1].path
      this.loadProject(projectId);

    });
  }

  private loadProject(projectId: string) {
    if (projectId && projectId != "new") {
      this.projectService.getProjectsById(projectId).pipe(map(value => {
        this.project = value
        this.calculateAllFields()
      }))
    }
  }

  calculateAllFields() {
    this.outputs = this.projectService.calculate(this.project.inputs)
  }


  getCashflowClassName() {
    let color: string = "red"
    if (this.outputs.cashflow > 0) {
      color = "green"
    }
    return "light-" + color + "-input"
  }

  saveProject() {
    this.projectService.createOrUpdateProject(this.project).subscribe(proj =>
      this.router.navigate(["/colocation/" + proj.id]))
  }


}
