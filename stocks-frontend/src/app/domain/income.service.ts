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

  createOrUpdateIncome(income: Income): Observable<Income> {
    let obs;
    if (income.id != null) {
      obs = this.incomeRespository.updateIncome(income)
    } else {
      obs = this.incomeRespository.createIncome(income)
    }
    return obs
  }

  deleteIncome(id: string) {
    return this.incomeRespository.deleteIncome(id).subscribe(() => {
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
