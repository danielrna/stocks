import {Component} from '@angular/core';
import {FormFieldService} from "../../../../domain/formfield.service";
import {ProjectType} from "../../../../domain/model/Project";

@Component({
  selector: 'app-lcd-project',
  templateUrl: './lcd-project-form.component.html',
  styleUrls: ['./lcd-project-form.component.scss']
})
export class LcdProjectFormComponent {

  constructor(private formFieldService: FormFieldService) {
  }
  public type = ProjectType.LCD

  lcdHouseFormFields = this.formFieldService.getHouseFormFields(this.type);
  lcdLoanFormFields = this.formFieldService.getLoanFormFields();
  lcdExpensesFormFields = this.formFieldService.getExpensesFormFields();
  lcdResultFormFields = this.formFieldService.getResultFormFields();


}
