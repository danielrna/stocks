import {Income} from "../domain/model/Income";
import {Observable} from "rxjs";

export interface IIncomeRepository {

  createIncome(income: Income): Observable<Income>

  updateIncome(income: Income):  Observable<Income>

  deleteIncome(id: string): Observable<void>

  getIncomesByUserId(userId: string): Observable<Income[]>

}
