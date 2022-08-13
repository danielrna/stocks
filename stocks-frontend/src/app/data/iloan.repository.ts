import {Loan} from "../domain/model/Loan";
import {Observable} from "rxjs";

export interface ILoanRepository {

  createLoan(loan: Loan): Observable<Loan>

  updateLoan(loan: Loan): Observable<Loan>

  deleteLoan(id: string): Observable<void>

  getLoansByUserId(userId: string): Observable<Loan[]>
}
