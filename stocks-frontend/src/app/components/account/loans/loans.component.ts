import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {getLoanTypeKeys, getLoanTypeValues, Loan, LoanType} from "../../../domain/model/Loan";
import {LoanService} from "../../../domain/loan.service";
import {IncomeType} from "../../../domain/model/Income";

@Component({
  selector: 'app-invest-profile',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

  loans: Loan[] = [];
  displayedColumns = ["name", "type", "value", "actions"];

  loanTypes = LoanType;
  loanTypesValues: string[] = getLoanTypeValues();

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

  toApiLoanType(type: string): string {
    switch (type) {
      case LoanType[LoanType.RP]:
        return "Résidence principale"
      case LoanType[LoanType.LOCATIF]:
        return "Immobilier locatif"
      case LoanType[LoanType.CONSO]:
        return "Conso"
      case LoanType[LoanType.AUTO]:
        return "Auto"
      case LoanType[LoanType.AUTRE]:
        return "Autre"
      default:
        return "Inconnu"
    }
  }}
