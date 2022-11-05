import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "../../../../domain/project.service";
import {placeHolderProject, Project} from "../../../../domain/model/Project";
import {AuthenticationService} from "../../../../domain/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InputFieldBase} from "./form/InputFieldBase";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectInputs} from "../../../../domain/model/ProjectInputs";
import {ProjectOutputs} from "../../../../domain/model/ProjectOutputs";


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  project: Project = <Project>{}
  @Input() houseInputFields: InputFieldBase<number>[] = [];
  @Input() loanInputFields: InputFieldBase<number>[] = [];
  @Input() expensesInputFields: InputFieldBase<number>[] = [];
  @Input() resultInputFields: InputFieldBase<number>[] = [];

  ngOnInit(): void {
    this.projectForm = this.toFormGroup(
      (this.houseInputFields as InputFieldBase<number>[])
        .concat(this.loanInputFields as InputFieldBase<number>[])
        .concat(this.expensesInputFields as InputFieldBase<number>[])
        .concat(this.resultInputFields as InputFieldBase<number>[])
    )

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


  calculateResults() {
    if (this.projectForm) {
      this.projectService.getProjectOutputs(this.toInputs(this.projectForm)).subscribe(outputs => {
        if (outputs) this.updateForm(outputs)
      })
    }
  }

  refreshProject() {
    console.log(this.route.pathFromRoot)
    this.route.pathFromRoot[3].url.subscribe(segment => {
      let projectId = segment[1].path
      this.loadProject(projectId);
    });
  }


  loadProject(projectId: string) {
    if (projectId && projectId != "new") {
      this.projectService.getProjectById(projectId).subscribe(value => {
        this.project = value
      })
    } else this.project = placeHolderProject

    this.calculateResults()
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

  toFormGroup(inputFields: InputFieldBase<number> []) {
    const group: any = {
      name: new FormControl("New Project", [Validators.required, Validators.minLength(5)]),
    };
    inputFields.forEach(inputField => {
      group[inputField.key] = inputField.required ? new FormControl(inputField.value || '', Validators.required)
        : new FormControl(inputField.value || '');
    });
    return new FormGroup(group);
  }

  updateForm(outputs: ProjectOutputs) {
    this.projectForm.get("monthlyExpenses")?.setValue(outputs.monthlyExpenses)
    this.projectForm.get("notaire")?.setValue(outputs.notaire)
    this.projectForm.get("tfMensuelle")?.setValue(outputs.tfMensuelle)
    this.projectForm.get("monthlyRent")?.setValue(outputs.monthlyRent)
    this.projectForm.get("totalEmprunte")?.setValue(outputs.totalEmprunte)
    this.projectForm.get("cashflow")?.setValue(outputs.cashflow)
    this.projectForm.get("cashflowWithoutLoan")?.setValue(outputs.cashflowWithoutLoan)
    this.projectForm.get("gestion")?.setValue(outputs.gestion)
    this.projectForm.get("monthlyLoan")?.setValue(outputs.monthlyLoan)
    this.projectForm.get("rendementBrut")?.setValue(outputs.rendementBrut)
  }

  toInputs(form: FormGroup): ProjectInputs {
    return <ProjectInputs>{
      nbChambre: +form.value.nbChambre,
      prixChambre: +form.value.prixChambre,
      prix: +form.value.prix,
      travaux: +form.value.travaux,
      apport: +form.value.apport,
      loanRate: +form.value.loanRate,
      dureeCredit: +form.value.dureeCredit,
      meubles: +form.value.meubles,
      copro: +form.value.copro,
      impots: +form.value.impots,
      tf: +form.value.tf,
      pno: +form.value.pno,
      autre: +form.value.autre,
      cfe: +form.value.cfe,
      entretien: +form.value.entretien,
      chasse: +form.value.chasse,
      vacance: +form.value.vacance,
    }
  }
}
