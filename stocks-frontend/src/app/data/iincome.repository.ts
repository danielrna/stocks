import {Income} from "../domain/model/Income";
import {Observable} from "rxjs";

export interface IIncomeRepository {

  createIncome(income: Income): Promise<string>

  updateIncome(income: Income): Promise<void>

  deleteIncome(id: string): Promise<void>

  getIncomesByOwnerId(ownerId: string): Observable<Income[]>

  getIncomesById(id: string): Promise<Income>
}
