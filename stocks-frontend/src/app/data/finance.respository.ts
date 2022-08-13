import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {handleError} from "./utils/LoggingUtils";
import {envUrl} from "./utils/GlobalConstants";
import {HttpClient} from '@angular/common/http';
import {FinancialSummary} from "../domain/model/FinancialSummary";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class FinanceRespository {
  private envUrl: string = envUrl;

  constructor(private http: HttpClient) {
  }


  getFinancialSummaryByUserId(_userId: string): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(`${this.envUrl}/finance/summary?userId=${_userId}`).pipe(
      tap((_finance: FinancialSummary) => console.log(` financial summary retrieved`)),
      catchError(handleError<FinancialSummary>('getFinancesByUserId'))
    );
  }


}
