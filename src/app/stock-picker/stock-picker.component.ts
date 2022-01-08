import {Component, OnInit} from '@angular/core';
import {FinanceService} from "../finance.service";
import {Quote} from "../Quote";
import {Symbol} from "../Symbol";

@Component({
  selector: 'app-stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.scss']
})
export class StockPickerComponent implements OnInit {
  selectedQuotes: Quote[] = [];
  symbols: Symbol[] = [];

  constructor(private financeService: FinanceService) {
  }

  ngOnInit() {
    this.financeService.getSymbols().subscribe(res => this.symbols = res)
    console.log(this.symbols)

  }

  private getQuote(ticker: String) {
    this.financeService.getEODQuote(ticker).subscribe(res => this.selectedQuotes = res.data)
  }

}
