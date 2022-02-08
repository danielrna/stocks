import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthenticationService} from "../../../domain/authentication.service";
import {IncomeService} from "../../../domain/income.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {getIncomeTypeKeys, getIncomeTypeValues} from "../../../domain/model/Income";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  incomes: Observable<any[]> = new Observable;
  incomeLabels = getIncomeTypeValues()
  incomeKeys = getIncomeTypeKeys()

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthenticationService,
    public incomeService: IncomeService,
    private router: Router,) {

  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.incomes = this.incomeService.getIncomesByOwnerId(user.uid)
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

}
