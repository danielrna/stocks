import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {QuoteResponse} from "../Quote";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Symbol} from "../Symbol";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  // private apiKey = "9a0c005faa579fba14a77ad1c36154ccdce5954859030232a7c8f8f868332e8c"
  private url = `https://api.coingecko.com/api/v3`
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: false
  };

  constructor(private http: HttpClient) {
  }

  getEODQuote(ticker: String): Observable<QuoteResponse> {
    return this.http.get<QuoteResponse>(this.url + "/simple/price?ids=" + ticker + "&vs_currencies=usd&include_24hr_change=true").pipe(
      catchError(this.handleError<QuoteResponse>('getEODQuote',))
    );
  }

  getSymbols(): Observable<Symbol[]> {
    return this.http.get<Symbol[]>(this.url + "/coins/list?include_platform=false").pipe(
      catchError(this.handleError<Symbol[]>('getSymbols',))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {

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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
