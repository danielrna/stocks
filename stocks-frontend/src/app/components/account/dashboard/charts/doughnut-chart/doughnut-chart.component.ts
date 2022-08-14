import {Component, Input, OnInit} from '@angular/core';
import {ChartData, ChartType} from 'chart.js';
import {Income} from "../../../../../domain/model/Income";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  @Input()
  pricedList: Income[] = []; //object can be Income for example
  @Input()
  public pricedKeys: string[] = []

  map = new Map(); //

  // Doughnut
  @Input()
  public doughnutChartLabels: string[] = []


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };
  public doughnutChartType: ChartType = 'doughnut';

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  ngOnInit(): void {
    this.pricedKeys.forEach(key => {
      this.map.set(key, 0)
    })

    this.pricedList.forEach(pricedObject => {
      let currentPrice = this.map.get(pricedObject.type)
      let sum = currentPrice + pricedObject.value
      this.map.set(pricedObject.type, sum)
    })
    this.doughnutChartData.datasets.push({data: Array.from(this.map.values())})
    this.doughnutChartData.labels = this.doughnutChartLabels

  }


  // events public

  chartClicked({event, active}: { event: MouseEvent, active: {} }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {} }): void {
    console.log(event, active);
  }
}
