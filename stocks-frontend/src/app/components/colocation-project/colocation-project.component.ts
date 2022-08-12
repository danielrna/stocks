import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../domain/project.service";
import {Project} from "../../domain/model/Project";
import {AuthenticationService} from "../../domain/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-colocation-project',
  templateUrl: './colocation-project.component.html',
  styleUrls: ['./colocation-project.component.scss']
})
export class ColocationProjectComponent implements OnInit {

  project: Project = <Project>{}
  id: number | null = null


  ngOnInit(): void {
    this.route.pathFromRoot[1].url.subscribe(segment => {
        this.id = parseInt(segment[1].path)
      }
    )
    this.refreshProject()
  }

  constructor(private projectService: ProjectService,
              private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.project.ownerId = user.uid
      }
    })
    this.refreshProject();
  }

  calculateProjectOutputs() {
    if (this.id)
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
    }
  }


  getCashflowClassName() {
    let color: string = "red"
    if (this.project.outputs && this.project.outputs.cashflow > 0) {
      color = "green"
    }
    return "light-" + color + "-input"
  }

  saveProject() {
    this.projectService.createOrUpdateProject(this.project).subscribe(proj =>
      this.router.navigate(["/account/projects"]))
  }


}
