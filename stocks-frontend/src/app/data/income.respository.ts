import {Injectable} from "@angular/core";
import {Income} from "../domain/model/Income";
import {Observable} from "rxjs";
import {IIncomeRepository} from "./iincome.repository";
import {catchError, tap} from "rxjs/operators";
import {handleError} from "./utils/LoggingUtils";
import {envUrl} from "./utils/GlobalConstants";
import {HttpClient} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class IncomeRespository implements IIncomeRepository {
  private envUrl: string = envUrl;

  constructor(private http: HttpClient) {
  }

  createIncome(_income: Income): Observable<Income> {
    return this.http.post<Income>(`${this.envUrl}/income`, _income).pipe(
      tap((newP: Income) => console.log(`Income created w/ id=${newP.id}`)),
      catchError(handleError<Income>('createIncome'))
    );
  }

  updateIncome(_income: Income): Observable<Income> {
    return this.http.put<Income>(`${this.envUrl}/income`, _income).pipe(
      tap((newP: Income) => console.log(`Income updated w/ id=${newP.id}`)),
      catchError(handleError<Income>('updateIncome'))
    );

  }

  deleteIncome(id: string): Observable<void> {
    return this.http.delete<void>(`${this.envUrl}/income/${id}`).pipe()

  }


  getIncomesByUserId(_userId: string): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.envUrl}/income?userId=${_userId}`).pipe(
      tap((_incomes: Income[]) => console.log(`${_incomes.length} incomes retrieved`)),
      catchError(handleError<Income[]>('getIncomesByUserId'))
    );
  }


}
