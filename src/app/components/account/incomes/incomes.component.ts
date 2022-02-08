import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {getIncomeTypeKeys, Income, IncomeType} from "../../../domain/model/Income";
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
  incomeTypesKeys: number[] = getIncomeTypeKeys();

  creationMode: boolean = false;
  newIcome: Income = {
    type: IncomeType.Immobilier,
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
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.newIcome.ownerId = user.uid
        this.incomeService.getIncomesByOwnerId(user.uid).subscribe(incomes => {
          this.incomes = incomes
        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }

  saveNewIncome() {
    this.incomeService.createOrUpdateIncome(this.newIcome).then(() => {
      this.creationMode = false
    })
  }

  deleteIncome(id: string) {
    this.incomeService.deleteIncome(id).then(() => {
    })
  }
}
