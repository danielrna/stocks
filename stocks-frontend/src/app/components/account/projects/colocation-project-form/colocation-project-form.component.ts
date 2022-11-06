import {Component} from '@angular/core';
import {FormFieldService} from "../../../../domain/formfield.service";
import {ProjectType} from "../../../../domain/model/Project";

@Component({
  selector: 'app-colocation-project',
  templateUrl: './colocation-project-form.component.html',
  styleUrls: ['./colocation-project-form.component.scss']
})
export class ColocationProjectFormComponent {
  constructor(private formFieldService: FormFieldService) {
  }

  colocHouseFormFields = this.formFieldService.getHouseFormFields(ProjectType.COLOC);
  colocLoanFormFields = this.formFieldService.getLoanFormFields();
  colocExpensesFormFields = this.formFieldService.getExpensesFormFields();
  colocResultFormFields = this.formFieldService.getResultFormFields();

}
