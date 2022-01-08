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
    function clean(res: Symbol[]) {
      return res.filter(it => {
        if (it.symbol.indexOf(`realtoken`) == -1
          && !it.name.startsWith(`0.5X `)
          && !it.name.startsWith(`1X `)
          && !it.name.startsWith(`3X `)) {
          return it
        } else return
      })
    }

    this.financeService.getSymbols().subscribe(res => this.symbols = clean(res))

  }

}
