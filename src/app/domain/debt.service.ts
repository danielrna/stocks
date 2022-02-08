import {Injectable} from '@angular/core';
import {DebtRespository} from "../data/debt.respository";
import {ToastService} from "./toast.service";
import {Debt} from "./model/Debt";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DebtService {


  constructor(private debtRespository: DebtRespository, private toast: ToastService) {
  }

  createOrUpdateDebt(debt: Debt): Promise<void> {
    let promise;
    if (debt.id != null) {
      promise = this.debtRespository.updateDebt(debt)
    } else {
      promise = this.debtRespository.createDebt(debt)
    }
    return promise.then(value => {
      this.toast.showToast("Debt Saved", ["success"])
    })

  }

  deleteDebt(id: string) {
    return this.debtRespository.deleteDebt(id).then(() => {
      this.toast.showToast("Debt Deleted", ["success"])
    })
  }

  getDebtsByOwnerId(id: string): Observable<Debt[]> {
    return this.debtRespository.getDebtsByOwnerId(id)
  }

  getDebtsById(id: string): Promise<Debt> {
    return this.debtRespository.getDebtsById(id)
  }

  clearDebts() {
    this.debtRespository.clear().subscribe(value => {
      value.forEach(value1 => {
        this.debtRespository.deleteDebt(value1.id!!).then(r => {
        })
      })
    })
  }
}
