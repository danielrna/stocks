import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "../../../../domain/project.service";
import {dummyColocProject, dummyLcdProject, Project, ProjectType} from "../../../../domain/model/Project";
import {AuthenticationService} from "../../../../domain/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormFieldBase} from "./form/FormFieldBase";
import {FormGroup} from "@angular/forms";
import {ColocInputs, LcdInputs, ProjectInputs} from "../../../../domain/model/ColocInputs";
import {ProjectOutputs} from "../../../../domain/model/ProjectOutputs";
import {FormFieldService} from "../../../../domain/formfield.service";


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  project: Project = <Project>{}
  type: ProjectType | undefined
  @Input() houseFormFields: FormFieldBase<number>[] = [];
  @Input() loanFormFields: FormFieldBase<number>[] = [];
  @Input() expensesFormFields: FormFieldBase<number>[] = [];
  @Input() resultFormFields: FormFieldBase<number>[] = [];
  @Input() projectType: ProjectType | undefined;

  constructor(private projectService: ProjectService,
              private auth: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private formService: FormFieldService) {

    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.project.userId = user.uid
      }
    })
    //init default values
    if (this.projectType == ProjectType.COLOC) this.project = dummyColocProject
    if (this.projectType == ProjectType.LCD) this.project = dummyLcdProject
    //load if present
    this.refreshProject();
  }

  ngOnInit(): void {
    this.projectForm = this.formService.getFormGroup((this.houseFormFields as FormFieldBase<number>[])
      .concat(this.loanFormFields as FormFieldBase<number>[])
      .concat(this.expensesFormFields as FormFieldBase<number>[])
      .concat(this.resultFormFields as FormFieldBase<number>[]))


    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.refreshProject();
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }


  calculateResults() {
    if (this.projectForm) {
      let inputs = this.updateProject();
      this.projectService.getProjectOutputs(inputs).subscribe(outputs => {
        if (outputs) {
          this.project.outputs = outputs
          this.updateOutputs(outputs)
        }
      })
    }
  }

  private updateProject() {
    let inputs: ProjectInputs = this.toInputs(this.projectForm);
    this.project.inputs = inputs
    this.project.name = this.projectForm.value.name
    return inputs;
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
    }

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


  updateOutputs(outputs: ProjectOutputs) {
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
    const inputs = <ProjectInputs>{
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
    }
    switch (this.projectType) {
      case ProjectType.COLOC : {
        return new ColocInputs(+form.value.nbChambre, +form.value.prixChambre, +form.value.vacance, inputs)
      }
      case ProjectType.LCD : {
        return new LcdInputs(+form.value.prixNuit, +form.value.occupation, inputs)
      }
      case ProjectType.IDR :
        throw Error("TODO")
    }
    return inputs;
  }


}
