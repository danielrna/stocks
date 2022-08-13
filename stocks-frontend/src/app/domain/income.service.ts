import {Injectable} from '@angular/core';
import {IncomeRespository} from "../data/income.respository";
import {ToastService} from "./toast.service";
import {Income} from "./model/Income";
import {Observable} from "rxjs";
import {ProjectRepository} from "../data/project-repository.service";
import {ProjectService} from "./project.service";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {


  constructor(private incomeRespository: IncomeRespository, private projectRespository: ProjectRepository, private projectService: ProjectService, private toast: ToastService) {
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

  getIncomesByUserId(id: string): Observable<Income[]> {
    return this.incomeRespository.getIncomesByUserId(id)
  }

  getNotSalaryIncomesByUserId(id: string): Observable<Income[]> {
    return this.incomeRespository.getNotSalaryIncomesByOwnerId(id)
  }

}
