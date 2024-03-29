import {Injectable} from "@angular/core";
import firebase from "firebase/compat";
import {Loan} from "../domain/model/Loan";
import {Observable} from "rxjs";
import {ILoanRepository} from "./iloan.repository";
import {catchError, tap} from "rxjs/operators";
import {handleError} from "./utils/LoggingUtils";
import {envUrl} from "./utils/GlobalConstants";
import {HttpClient} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class LoanRespository implements ILoanRepository {
  private envUrl: string = envUrl;

  constructor(private http: HttpClient) {
  }

  createLoan(_loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(`${this.envUrl}/loan`, _loan).pipe(
      tap((newP: Loan) => console.log(`Loan created w/ id=${newP.id}`)),
      catchError(handleError<Loan>('createLoan'))
    );
  }

  updateLoan(_loan: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.envUrl}/loan`, _loan).pipe(
      tap((newP: Loan) => console.log(`Loan updated w/ id=${newP.id}`)),
      catchError(handleError<Loan>('updateLoan'))
    );

  }

  deleteLoan(id: string): Observable<void> {
    return this.http.delete<void>(`${this.envUrl}/loan/${id}`).pipe()

  }


  getLoansByUserId(_userId: string): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.envUrl}/loan?userId=${_userId}`).pipe(
      tap((_loans: Loan[]) => console.log(`${_loans.length} loans retrieved`)),
      catchError(handleError<Loan[]>('getLoansByUserId'))
    );
  }


}
