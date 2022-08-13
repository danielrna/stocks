import {cryptoUrl} from "../data/utils/GlobalConstants";
import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Symbol} from "../Symbol";

11

@Injectable({
  providedIn: 'root'
})
export class FinanceService {


  constructor(private http: HttpClient) {
  }

  getSymbols(): Observable<Symbol[]> {
    return this.http.get<Symbol[]>(cryptoUrl + "/coins/list?include_platform=false").pipe(
      catchError(this.handleError<Symbol[]>('getSymbols',))
    );
  }

  /** Log a HeroService message with the MessageService */
  private static log(message: string) {
    console.log(message)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      FinanceService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
