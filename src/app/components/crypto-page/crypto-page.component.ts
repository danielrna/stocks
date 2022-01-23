import {Component, OnInit} from '@angular/core';
import {FinanceService} from "../../services/finance.service";
import {Symbol} from "../../Symbol";

@Component({
  selector: 'app-crypto-page',
  templateUrl: './crypto-page.component.html',
  styleUrls: ['./crypto-page.component.scss']
})
export class CryptoPageComponent implements OnInit {
  symbols: Symbol[] = [];
  filteredSymbols: Symbol[] = [];
  filter: string = "";

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

    this.financeService.getSymbols().subscribe(res =>
      (this.symbols = clean(res)) && (this.filteredSymbols = this.symbols)
    )


  }

  setFilteredSymbols() {

    this.filteredSymbols = this.symbols.filter(value => {
      return value.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        || value.symbol.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
    })
  }


}
