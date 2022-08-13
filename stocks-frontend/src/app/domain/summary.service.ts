import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IncomeService} from "./income.service";
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


}
