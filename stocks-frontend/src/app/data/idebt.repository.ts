import {Debt} from "../domain/model/Debt";
import {Observable} from "rxjs";

export interface IDebtRepository {

  createDebt(debt: Debt): Promise<string>

  updateDebt(debt: Debt): Promise<void>

  deleteDebt(id: string): Promise<void>

  getDebtsByOwnerId(ownerId: string): Observable<Debt[]>

  getDebtsById(id: string): Promise<Debt>
}
