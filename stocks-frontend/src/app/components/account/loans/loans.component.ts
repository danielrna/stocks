import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {getLoanTypeKeys, Loan, LoanType} from "../../../domain/model/Loan";
import {LoanService} from "../../../domain/loan.service";

@Component({
  selector: 'app-invest-profile',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

  loans: Loan[] = [];
  displayedColumns = ["name", "type", "value", "actions"];

  loanTypes = LoanType;
  loanTypesKeys: number[] = getLoanTypeKeys();

  creationMode: boolean = false;
  newIcome: Loan = {
    type: LoanType.RP,
    name: "Credit residence principale",
    value: 2500
  } as Loan;

  constructor(
    public auth: AuthenticationService,
    public loanService: LoanService,
    private router: Router,
    public dialog: MatDialog) {
    console.log(this.loanTypes)
  }


  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.newIcome.userId = user.uid
        this.loanService.getLoansByUserId(user.uid).subscribe(loans => {
          this.loans = loans
        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }

  saveNewLoan() {
    this.loanService.createOrUpdateLoan(this.newIcome).subscribe(() => {
      this.creationMode = false
    })
  }

  deleteLoan(id: string) {
    this.loanService.deleteLoan(id)
  }
}
