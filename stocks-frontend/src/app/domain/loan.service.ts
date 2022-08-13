import {Injectable} from '@angular/core';
import {LoanRespository} from "../data/loan.respository";
import {ToastService} from "./toast.service";
import {Loan} from "./model/Loan";
import {Observable} from "rxjs";
import {ProjectRepository} from "../data/project-repository.service";
import {ProjectService} from "./project.service";

@Injectable({
  providedIn: 'root'
})
export class LoanService {


  constructor(private loanRespository: LoanRespository,
              private projectRespository: ProjectRepository,
              private projectService: ProjectService,
              private toast: ToastService) {
  }

  createOrUpdateLoan(loan: Loan): Observable<Loan> {
    let obs;
    if (loan.id != null) {
      obs = this.loanRespository.updateLoan(loan)
    } else {
      obs = this.loanRespository.createLoan(loan)
    }
    return obs
  }

  deleteLoan(id: string) {
    return this.loanRespository.deleteLoan(id).subscribe(() => {
      this.toast.showToast("Loan Deleted", ["success"])
    })

  }

  getLoansByUserId(id: string): Observable<Loan[]> {
    return this.loanRespository.getLoansByUserId(id)
  }


}
