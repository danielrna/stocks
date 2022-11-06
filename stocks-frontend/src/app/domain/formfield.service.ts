import {Injectable} from "@angular/core";
import {FormFieldBase} from "../components/account/projects/project-form/form/FormFieldBase";
import {NumberFormField} from "../components/account/projects/project-form/form/TextboxFormField";
import {ProjectType} from "./model/Project";


@Injectable({
  providedIn: 'root'
})
export class FormFieldService {

  getHouseFormFields(type: ProjectType): FormFieldBase<number>[] {
    const homeFormFields: FormFieldBase<number>[] = [
      new NumberFormField({key: 'tf', label: 'Taxe Foncière', value: 500, required: true, order: 3}),
      new NumberFormField({key: 'travaux', label: 'Travaux', value: 80000, required: true, order: 4}),
      new NumberFormField({key: 'prix', label: 'Prix achat', value: 110000, required: true, order: 5}),
      new NumberFormField({key: 'chasse', label: 'Chasse', value: 10000, required: true, order: 6}),
      new NumberFormField({key: 'notaire', label: 'Notaire', value: 8000, required: true, order: 8, readonly: true})
    ];
    if (type == ProjectType.LCD) {
      homeFormFields.push(
        new NumberFormField({key: 'prixNuit', label: 'Prix par nuit', value: 90, required: true, order: 2}),
        new NumberFormField({key: 'occupancy', label: 'Taux d\'occupation', value: 70, required: true, order: 7}),
      )
    }
    if (type == ProjectType.COLOC) {
      homeFormFields.push(
        new NumberFormField({key: 'nbChambre', label: 'Nombre de chambres', value: 4, required: true, order: 1,}),
        new NumberFormField({key: 'prixChambre', label: 'Loyer par chambre', value: 400, required: true, order: 2}),
        new NumberFormField({key: 'vacance', label: 'Vacance locative (nombre de mois)', value: 1.5, required: true, order: 7}),
      )
    }
    return homeFormFields.sort((a, b) => a.order - b.order);
  }

  getLoanFormFields(): FormFieldBase<number>[] {
    const loanFormFields: FormFieldBase<number>[] = [
      new NumberFormField({key: 'dureeCredit', label: 'Durée', value: 25, required: true, order: 1}),
      new NumberFormField({key: 'loanRate', label: 'Taux', value: 1.37, required: true, order: 2}),
      new NumberFormField({key: 'apport', label: 'Apport', value: 10000, required: true, order: 3}),
      new NumberFormField({key: 'totalEmprunte', label: 'Total emprunté', value: 220000, required: true, order: 4, readonly: true}),
      new NumberFormField({key: 'monthlyLoan', label: 'Crédit', value: 900, required: true, order: 5, readonly: true}),
    ]
    return loanFormFields.sort((a, b) => a.order - b.order);
  }

  getExpensesFormFields(): FormFieldBase<number>[] {
    const expensesFormFields: FormFieldBase<number>[] = [
      new NumberFormField({key: 'copro', label: 'Copro', value: 100, required: true, order: 1}),
      new NumberFormField({key: 'impots', label: 'Impots', value: 100, required: true, order: 2}),
      new NumberFormField({key: 'entretien', label: 'Entretien', value: 100, required: true, order: 3}),
      new NumberFormField({key: 'cfe', label: 'CFE', value: 100, required: true, order: 4}),
      new NumberFormField({key: 'autre', label: 'autre', value: 100, required: true, order: 5}),
      new NumberFormField({key: 'pno', label: 'PNO', value: 100, required: true, order: 6}),
      new NumberFormField({key: 'tfMensuelle', label: 'Taxe Foncière mensuelle', value: 100, required: true, order: 7, readonly: true}),
      new NumberFormField({key: 'gestion', label: 'Gestion du bien 8%', value: 100, required: true, order: 8, readonly: true}),
    ]
    return expensesFormFields.sort((a, b) => a.order - b.order);

  }

  getResultFormFields(): FormFieldBase<number>[] {
    const resultFormFields: FormFieldBase<number>[] = [
      new NumberFormField({key: 'monthlyExpenses', label: 'Dépenses totales', value: 900,required: true,order: 1,readonly: true}),
      new NumberFormField({key: 'monthlyRent', label: 'Loyer mensuel', value: 2000,required: true,order: 2,readonly: true}),
      new NumberFormField({key: 'cashflow', label: 'Cashflow', value: 450,required: true,order: 3,readonly: true}),
      new NumberFormField({key: 'rendementBrut', label: 'Rendement Brut', value: 7,required: true,order: 4,readonly: true}),
      new NumberFormField({key: 'rendementNet', label: 'Rendement Net', value: 5, required: true, order: 5, readonly: true})
    ]
    return resultFormFields.sort((a, b) => a.order - b.order);

  }

}
