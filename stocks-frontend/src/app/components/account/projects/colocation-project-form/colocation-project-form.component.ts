import {Component} from '@angular/core';
import {InputFieldBase} from "../project-form/form/InputFieldBase";
import {NumberInputField} from "../project-form/form/TextboxInputField";

@Component({
  selector: 'app-colocation-project',
  templateUrl: './colocation-project-form.component.html',
  styleUrls: ['./colocation-project-form.component.scss']
})
export class ColocationProjectFormComponent {
  colocHouseInputFields = this.getHouseInputFields();
  colocLoanInputFields = this.getLoanInputFields();
  colocExpensesInputFields = this.getExpensesInputFields();
  colocResultInputFields = this.getResultInputFields();

  getHouseInputFields(): InputFieldBase<number>[] {
    const homeInputFields: InputFieldBase<number>[] = [

      new NumberInputField({
        key: 'nbChambre',
        label: 'Nombre de chambres',
        value: 4,
        required: true,
        order: 1,
      }),

      new NumberInputField({
        key: 'prixChambre',
        label: 'Loyer par chambre',
        value: 400,
        required: true,
        order: 2
      }),
      new NumberInputField({
        key: 'tf',
        label: 'Taxe Foncière',
        value: 500,
        required: true,
        order: 3
      }),
      new NumberInputField({
        key: 'travaux',
        label: 'Travaux',
        value: 80000,
        required: true,
        order: 4
      }),
      new NumberInputField({
        key: 'prix',
        label: 'Prix achat',
        value: 110000,
        required: true,
        order: 5
      }),
      new NumberInputField({
        key: 'chasse',
        label: 'Chasse',
        value: 10000,
        required: true,
        order: 6
      }),
      new NumberInputField({
        key: 'vacance',
        label: 'Vacance locative (nombre de mois)',
        value: 1.5,
        required: true,
        order: 7
      })
      ,
      new NumberInputField({
        key: 'notaire',
        label: 'Notaire',
        value: 8000,//calculé
        required: true,
        order: 8,
        readonly: true
      })

    ];
    return homeInputFields.sort((a, b) => a.order - b.order);
  }

  getLoanInputFields(): InputFieldBase<number>[] {
    const loanInputFields: InputFieldBase<number>[] = [
      new NumberInputField({
        key: 'dureeCredit',
        label: 'Durée',
        value: 25,
        required: true,
        order: 1

      }),
      new NumberInputField({
        key: 'loanRate',
        label: 'Taux',
        value: 1.37,
        required: true,
        order: 2
      }),
      new NumberInputField({
        key: 'apport',
        label: 'Apport',
        value: 10000,
        required: true,
        order: 3
      }),
      new NumberInputField({
        key: 'totalEmprunte',
        label: 'Total emprunté',
        value: 220000,//calculé
        required: true,
        order: 4,
        readonly: true

      }),
      new NumberInputField({
        key: 'monthlyLoan',
        label: 'Crédit',//calculé
        value: 900,//
        required: true,
        order: 5,
        readonly: true

      }),
    ]
    return loanInputFields.sort((a, b) => a.order - b.order);

  }

  getExpensesInputFields(): InputFieldBase<number>[] {
    const expensesInputFields: InputFieldBase<number>[] = [
      new NumberInputField({
        key: 'copro',
        label: 'Copro',
        value: 100,
        required: true,
        order: 1
      }), new NumberInputField({
        key: 'impots',
        label: 'Impots',
        value: 100,
        required: true,
        order: 2
      }), new NumberInputField({
        key: 'entretien',
        label: 'Entretien',
        value: 100,
        required: true,
        order: 3
      }), new NumberInputField({
        key: 'cfe',
        label: 'CFE',
        value: 100,
        required: true,
        order: 4
      }), new NumberInputField({
        key: 'autre',
        label: 'autre',
        value: 100,
        required: true,
        order: 5
      }), new NumberInputField({
        key: 'pno',
        label: 'PNO',
        value: 100,
        required: true,
        order: 6
      }), new NumberInputField({
        key: 'tfMensuelle',
        label: 'Taxe Foncière mensuelle',
        value: 100,//calculé
        required: true,
        order: 7,
        readonly: true

      }), new NumberInputField({
        key: 'gestion',
        label: 'Gestion du bien 8%',
        value: 100,//calculé
        required: true,
        order: 8,
        readonly: true

      }),
    ]
    return expensesInputFields.sort((a, b) => a.order - b.order);

  }

  getResultInputFields(): InputFieldBase<number>[] {
    const resultInputFields: InputFieldBase<number>[] = [
      new NumberInputField({
        key: 'monthlyExpenses',
        label: 'Dépenses totales',
        value: 900,//calculé
        required: true,
        order: 1,
        readonly: true

      }),
      new NumberInputField({
        key: 'monthlyRent',
        label: 'Loyer mensuel',
        value: 2000,//calculé
        required: true,
        order: 2,
        readonly: true
      })
      ,
      new NumberInputField({
        key: 'cashflow',
        label: 'Cashflow',
        value: 450,//calculé
        required: true,
        order: 3,
        readonly: true

      }),
      new NumberInputField({
        key: 'rendementBrut',
        label: 'Rendement Brut',
        value: 7,//calculé
        required: true,
        order: 4,
        readonly: true

      })
      ,
      new NumberInputField({
        key: 'rendementNet',
        label: 'Rendement Net',
        value: 5,//calculé
        required: true,
        order: 5,
        readonly: true

      })

    ]
    return resultInputFields.sort((a, b) => a.order - b.order);

  }
}
