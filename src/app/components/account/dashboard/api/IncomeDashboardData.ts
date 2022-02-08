import {Observable} from "rxjs";

export interface IncomeDashboardData {
  incomes: Observable<any[]>
  incomeLabels: string[]
  incomeKeys: number[]
}
