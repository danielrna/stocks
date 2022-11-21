import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthenticationService} from "../../../domain/authentication.service";
import {IncomeService} from "../../../domain/income.service";
import {Router} from "@angular/router";
import {SummaryService} from "../../../domain/summary.service";
import {IncomeDashboardData} from "./api/IncomeDashboardData";
import {getIncomeTypeValues} from "../../../domain/model/Income";
import {MiniCardData} from "./api/MiniCardData";


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
        this.summaryService.getFinancialSummaryOfUser(user.uid).subscribe(summary => {
          this.miniCards.push(
            {
              title: "Taux d'endettement",
              value: summary.debtRatio.toFixed(2),
              symbol: "%",
            },
            {
              title: "Cashflow Passif (hors salaire)",
              value: summary.passiveTotalIncome.toString(),
              symbol: "€",
            }
          )

        })
      }
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

}
