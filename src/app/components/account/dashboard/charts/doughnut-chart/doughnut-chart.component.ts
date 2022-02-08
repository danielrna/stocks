import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartType} from 'chart.js';
import {getIncomeTypeKeys, getIncomeTypeValues, Income} from "../../../../../domain/model/Income";
import {Observable} from "rxjs";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  @Input()
  userIncomes: Observable<Income[]> = new Observable;
  map = new Map();
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  // Doughnut
  public doughnutChartLabels: string[] = getIncomeTypeValues()

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: []
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    getIncomeTypeKeys().forEach(key => this.map.set(key, 0))
    this.userIncomes.subscribe(incomes => {
      incomes.forEach(income => {
        let sum = this.map.get(income.type) + income.value
        this.map.set(income.type, sum)
      })
      this.doughnutChartData.datasets.push({data: Array.from(this.map.values())})
    })
  }


  // events public

  chartClicked({event, active}: { event: MouseEvent, active: {} }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {} }): void {
    console.log(event, active);
  }
}
