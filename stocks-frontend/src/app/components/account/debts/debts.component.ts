import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Debt, DebtType, getDebtTypeKeys} from "../../../domain/model/Debt";
import {DebtService} from "../../../domain/debt.service";

@Component({
  selector: 'app-invest-profile',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss']
})
export class DebtsComponent implements OnInit {

  debts: Debt[] = [];
  displayedColumns = ["name", "type", "value", "actions"];

  debtTypes = DebtType;
  debtTypesKeys: number[] = getDebtTypeKeys();

  creationMode: boolean = false;
  newIcome: Debt = {
    type: DebtType.RP,
    name: "Credit residence principale",
    value: 2500
  } as Debt;

  constructor(
    public auth: AuthenticationService,
    public debtService: DebtService,
    private router: Router,
    public dialog: MatDialog) {
    console.log(this.debtTypes)
  }


  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.newIcome.ownerId = user.uid
        this.debtService.getDebtsByOwnerId(user.uid).subscribe(debts => {
          this.debts = debts
        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }

  saveNewDebt() {
    this.debtService.createOrUpdateDebt(this.newIcome).then(() => {
      this.creationMode = false
    })
  }

  deleteDebt(id: string) {
    this.debtService.deleteDebt(id).then(() => {
    })
  }
}
