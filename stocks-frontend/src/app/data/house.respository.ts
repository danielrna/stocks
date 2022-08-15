import {Injectable} from "@angular/core";
import {House} from "../domain/model/House";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {handleError} from "./utils/LoggingUtils";
import {envUrl} from "./utils/GlobalConstants";
import {HttpClient} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class HouseRespository {
  private envUrl: string = envUrl;

  constructor(private http: HttpClient) {
  }

  createHouse(_house: House): Observable<House> {
    return this.http.post<House>(`${this.envUrl}/house`, _house).pipe(
      tap((newP: House) => console.log(`House created w/ id=${newP.id}`)),
      catchError(handleError<House>('createHouse'))
    );
  }

  updateHouse(_house: House): Observable<House> {
    return this.http.put<House>(`${this.envUrl}/house`, _house).pipe(
      tap((newP: House) => console.log(`House updated w/ id=${newP.id}`)),
      catchError(handleError<House>('updateHouse'))
    );

  }

  deleteHouse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.envUrl}/house/${id}`).pipe()

  }


  getHousesByUserId(_userId: string): Observable<House[]> {
    return this.http.get<House[]>(`${this.envUrl}/house?userId=${_userId}`).pipe(
      tap((_houses: House[]) => console.log(`${_houses.length} houses retrieved`)),
      catchError(handleError<House[]>('getHousesByUserId'))
    );
  }


}
