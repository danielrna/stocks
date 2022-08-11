import {Injectable} from '@angular/core';
import {IncomeRespository} from "../data/income.respository";
import {ToastService} from "./toast.service";
import {Income, IncomeType} from "./model/Income";
import {combineLatest, Observable} from "rxjs";
import {ProjectRepository} from "../data/project-repository.service";
import {map} from "rxjs/operators";
import {Project} from "./model/Project";
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

  toIncome(project: Project): Income {
    let out = this.projectService.calculate(project.inputs)
    return <Income>{
      id: "",
      type: IncomeType.Immobilier,
      name: `Linked to <${project.name}>`,
      value: out.cashflowNoCredit,
      ownerId: project.ownerId
    }

  }
  getIncomesByOwnerId(id: string): Observable<Income[]> {
    return this.incomeRespository.getIncomesByOwnerId(id)
  }
  //
  // getIncomesByOwnerId(id: string): Observable<Income[]> {
  //
  //
  //   let obs1: Observable<Income[]> = this.projectRespository.getProjectsByOwnerId(id).pipe(
  //     map(it => {
  //               return this.toIncome(it)
  //     })
  //   )
  //
  //   let obs2 = this.incomeRespository.getIncomesByOwnerId(id)
  //   return combineLatest([obs1, obs2]).pipe(source => {
  //
  //   })
  // }

  getNotSalaryIncomesByOwnerId(id: string): Observable<Income[]> {
    return this.incomeRespository.getNotSalaryIncomesByOwnerId(id)
  }

  getIncomesById(id: string): Promise<Income> {
    return this.incomeRespository.getIncomesById(id)
  }

  clearIncomes() {
    this.incomeRespository.clear().subscribe(value => {
      value.forEach(value1 => {
        this.incomeRespository.deleteIncome(value1.id!!).then(r => {
        })
      })
    })
  }
}
