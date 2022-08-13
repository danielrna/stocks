import {Injectable} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {IncomeService} from "./income.service";
import {map} from "rxjs/operators";
import {IncomeType} from "./model/Income";
import {DebtService} from "./debt.service";
import {FinancialSummary} from "./model/FinancialSummary";
import {FinanceRespository} from "../data/finance.respository";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private incomeService: IncomeService,
              private debtService: DebtService,
              private financeRepository: FinanceRespository,
  ) {
  }

  getNotSalaryIncomesByUserId(id: string): Observable<FinancialSummary> {
    return this.financeRepository.getFinancialSummaryByUserId(id)
  }


  getUserDebtRate(id: string): Observable<number> {
    let incomes = this.getUserBankConsideredIncome(id)
    let debts = this.getUserDebts(id)
    return combineLatest([incomes, debts]).pipe(map(res => {
      if (res[1] == 0) return 0
      return res[1] / res[0] * 100
    }))
  }


  private getUserDebts(id: string): Observable<number> {
    return this.debtService.getDebtsByOwnerId(id).pipe(
      map(debts => {
        return debts.reduce(function (accumulator, a) {
          return accumulator + a.value;
        }, 0)
      }))
  }

  private getUserBankConsideredIncome(id: string): Observable<number> {
    return this.incomeService.getIncomesByUserId(id).pipe(
      map(incomes => {
        return incomes.reduce(function (accumulator, a) {
          //bank only considers 70% of immo income
          if (a.type == IncomeType.IMMO) {
            return accumulator + 0.7 * a.value;
          } else {
            return accumulator + a.value;
          }
        }, 0)
      }))
  }

  private get(id: string): Observable<number> {
    return this.incomeService.getIncomesByUserId(id).pipe(
      map(incomes => {
        return incomes.reduce(function (accumulator, a) {
          //bank only considers 70% of immo income
          if (a.type == IncomeType.IMMO) {
            return accumulator + 0.7 * a.value;
          } else {
            return accumulator + a.value;
          }
        }, 0)
      }))
  }


}
