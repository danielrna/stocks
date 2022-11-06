import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "../../../../domain/project.service";
import {dummyColocProject, dummyLcdProject, Project} from "../../../../domain/model/Project";
import {AuthenticationService} from "../../../../domain/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormFieldBase} from "./form/FormFieldBase";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ColocInputs} from "../../../../domain/model/ColocInputs";
import {ProjectOutputs} from "../../../../domain/model/ProjectOutputs";


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  project: Project = <Project>{}
  @Input() houseFormFields: FormFieldBase<number>[] = [];
  @Input() loanFormFields: FormFieldBase<number>[] = [];
  @Input() expensesFormFields: FormFieldBase<number>[] = [];
  @Input() resultFormFields: FormFieldBase<number>[] = [];

  constructor(private projectService: ProjectService,
              private auth: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {

    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.project.userId = user.uid
      }
    })
    this.refreshProject();
  }
  ngOnInit(): void {
    this.projectForm = this.toFormGroup(
      (this.houseFormFields as FormFieldBase<number>[])
        .concat(this.loanFormFields as FormFieldBase<number>[])
        .concat(this.expensesFormFields as FormFieldBase<number>[])
        .concat(this.resultFormFields as FormFieldBase<number>[])
    )

    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.refreshProject();
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }




  calculateResults() {
    if (this.projectForm) {
      let inputs: ColocInputs = this.toInputs(this.projectForm);
      this.project.inputs = inputs

      this.projectService.getProjectOutputs(inputs).subscribe(outputs => {
        if (outputs) {
          this.project.outputs = outputs
          this.updateForm(outputs)
        }
      })
    }
  }

  refreshProject() {
    console.log(this.route.pathFromRoot)
    this.route.pathFromRoot[3].url.subscribe(segment => {
      let type = segment[0].path
      let projectId = segment[1].path
      this.loadProject(projectId, type);
    });
  }

  loadProject(projectId: string, type: string) {
    if (projectId && projectId != "new") {
      this.projectService.getProjectById(projectId).subscribe(value => {
        this.project = value
      })
    } else {
      if (type == 'lcd') this.project = dummyColocProject
      if (type == 'coloc') this.project = dummyLcdProject
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

  toFormGroup(inputFields: FormFieldBase<number> []) {
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

  toInputs(form: FormGroup): ColocInputs {
    return <ColocInputs>{
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
