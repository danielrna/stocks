import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {getIncomeTypeValues, Income, IncomeType} from "../../../domain/model/Income";
import {IncomeService} from "../../../domain/income.service";

@Component({
  selector: 'app-invest-profile',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {

  incomes: Income[] = [];
  displayedColumns = ["name", "type", "value", "actions"];

  incomeTypes = IncomeType;
  incomeTypesValues: string[] = getIncomeTypeValues();

  creationMode: boolean = false;
  newIcome: Income = {
    type: IncomeType.IMMO,
    name: "Nouveau revenu",
    value: 2500
  } as Income;

  constructor(
    public auth: AuthenticationService,
    public incomeService: IncomeService,
    private router: Router,
    public dialog: MatDialog) {
    console.log(this.incomeTypes)
  }


  ngOnInit(): void {
    this.refreshIncomes();
  }

  private refreshIncomes() {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.newIcome.userId = user.uid
        this.incomeService.getIncomesByUserId(user.uid).subscribe(incomes => {
          this.incomes = incomes
        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }

  saveNewIncome() {
    this.incomeService.createOrUpdateIncome(this.newIcome).subscribe(() => {
      this.creationMode = false
      this.refreshIncomes()
    })
  }

  deleteIncome(id: string) {
    this.incomeService.deleteIncome(id)
    this.refreshIncomes()

  }

  toApiIncomeType(type: string): string {
    switch (type) {
      case IncomeType[IncomeType.IMMO]:
        return "Immobilier locatif"
      case IncomeType[IncomeType.SALAIRE]:
        return "Salaire"
      case IncomeType[IncomeType.AUTRE]:
        return "Autre"
      default:
        return "Inconnu"
    }
  }
}
