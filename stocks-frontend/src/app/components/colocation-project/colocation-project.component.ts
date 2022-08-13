import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../domain/project.service";
import {Project, ProjectType} from "../../domain/model/Project";
import {AuthenticationService} from "../../domain/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectInputs} from "../../domain/model/ProjectInputs";
import {ProjectOutputs} from "../../domain/model/ProjectOutputs";

@Component({
  selector: 'app-colocation-project',
  templateUrl: './colocation-project.component.html',
  styleUrls: ['./colocation-project.component.scss']
})
export class ColocationProjectComponent implements OnInit {

  project: Project = <Project>{}

  ngOnInit(): void {
    this.route.pathFromRoot[1].url.subscribe(segment => {
        this.project.id = parseInt(segment[1].path)
      }
    )
    this.refreshProject()
  }

  constructor(private projectService: ProjectService,
              private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.project.userId = user.uid
      }
    })
    this.refreshProject();
  }

  calculateProjectOutputs() {
    if (this.project.inputs)
      this.projectService.getProjectOutputs(this.project.inputs).subscribe(outputs => {
        this.project.outputs = outputs
      })
  }

  refreshProject() {
    this.route.pathFromRoot[1].url.subscribe(segment => {
      let projectId = segment[1].path
      this.loadProject(projectId);

    });
  }

  private loadProject(projectId: string) {
    if (projectId && projectId != "new") {
      this.projectService.getProjectById(projectId).subscribe(value => {
        this.project = value
      })
    } else {
      this.project = <Project>{
        id: null,
        type: ProjectType.Colocation,
        userId: "",
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
        },
        outputs: <ProjectOutputs>{
        }
      }
    }
    this.calculateProjectOutputs()
  }


  getCashflowClassName() {
    let color: string = "red"
    if (this.project.outputs && this.project.outputs.cashflow > 0) {
      color = "green"
    }
    return "light-" + color + "-input"
  }

  saveProject() {
    this.projectService.createOrUpdateProject(this.project as Project).subscribe(proj =>
      this.router.navigate(["/account/projects"]))
  }


}
