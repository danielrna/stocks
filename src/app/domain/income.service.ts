import { Injectable } from '@angular/core';
import {IncomeRespository} from "../data/income.respository";
import {ToastService} from "./toast.service";
import {Income} from "./model/Income";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {


  constructor(private incomeRespository: IncomeRespository, private toast: ToastService) {
  }

  createOrUpdateIncome(income: Income): Promise<void> {
    let promise;
    if (income.id != null) {
      promise = this.incomeRespository.updateIncome(income)
    } else {
      promise = this.incomeRespository.createIncome(income)
    }
    return promise.then(value => {
      this.toast.showToast("Income Saved", ["success"])
    })

  }

  deleteIncome(id: string) {
    return this.incomeRespository.deleteIncome(id).then(() => {
      this.toast.showToast("Income Deleted", ["success"])
    })
  }

  getIncomesByOwnerId(id: string): Observable<Income[]> {
    return this.incomeRespository.getIncomesByOwnerId(id)
  }

  getIncomesById(id: string): Promise<Income> {
    return this.incomeRespository.getIncomesById(id)
  }

  clearIncomes() {
    this.incomeRespository.clear().subscribe(value => {
      value.forEach(value1 => {
        this.incomeRespository.deleteIncome(value1.id!!).then(r =>{} )
      })
    })
  }
}
