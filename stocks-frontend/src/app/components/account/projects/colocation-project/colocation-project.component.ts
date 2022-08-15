import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../../domain/project.service";
import {placeHolderProject, Project} from "../../../../domain/model/Project";
import {AuthenticationService} from "../../../../domain/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-colocation-project',
  templateUrl: './colocation-project.component.html',
  styleUrls: ['./colocation-project.component.scss']
})
export class ColocationProjectComponent implements OnInit {

  project: Project = <Project>{}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.refreshProject();
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }

  constructor(private projectService: ProjectService,
              private auth: AuthenticationService, private route: ActivatedRoute, private router: Router) {

    this.auth.getCurrentUser().subscribe(user => {
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
    console.log(this.route.pathFromRoot)
    this.route.pathFromRoot[3].url.subscribe(segment => {
      let projectId = segment[1].path
      this.loadProject(projectId);
    });
  }

  private loadProject(projectId: string) {
    if (projectId && projectId != "new") {
      this.projectService.getProjectById(projectId).subscribe(value => {
        this.project = value
      })
    } else this.project = placeHolderProject

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
