import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthenticationService} from "../../../domain/authentication.service";
import {IncomeService} from "../../../domain/income.service";
import {Router} from "@angular/router";
import {SummaryService} from "../../../domain/summary.service";
import {IncomeDashboardData} from "./api/IncomeDashboardData";
import {getIncomeTypeKeys, getIncomeTypeValues, Income} from "../../../domain/model/Income";
import {MiniCardData} from "./api/MiniCardData";
import {toApiProjectType} from "../projects/projects.component";
import {Observable} from "rxjs";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  incomeDashboardData = {} as IncomeDashboardData
  miniCards: MiniCardData[] = []

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthenticationService,
    public incomeService: IncomeService,
    private router: Router,
    private summaryService: SummaryService) {

  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.incomeDashboardData = this.getIncomeDashboardData(user.uid)
        console.log(this.incomeDashboardData)
        this.summaryService.getNotSalaryIncomesByUserId(user.uid).subscribe(summary => {
          this.miniCards.push(
            DashboardComponent.getLoanRateMiniCardData(user.uid, summary.debtRatio),
            DashboardComponent.getCashflowMiniCardData(user.uid, summary.passiveTotalIncome)
          )

        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })

  }

  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},
          table: {cols: 1, rows: 4},
        };
      }

      return {
        columns: 4,
        miniCard: {cols: 1, rows: 1},
        chart: {cols: 2, rows: 2},
        table: {cols: 4, rows: 4},
      };
    })
  );


  private getIncomeDashboardData(id: string) {
    return {
      incomes: this.incomeService.getIncomesByUserId(id),
      incomeLabels: getIncomeTypeValues(),
      incomeKeys: getIncomeTypeValues()
    };
  }

  private static getLoanRateMiniCardData(id: string, value: number): MiniCardData {
    return {
      title: "Taux d'endettement",
      value: value.toFixed(2),
      symbol: "%",
    } as MiniCardData
  }

  private static getCashflowMiniCardData(id: string, value: number) {
    return {
      title: "Cashflow Passif (hors salaire)",
      value: value.toString(),
      symbol: "€",
    } as MiniCardData
  }
}
