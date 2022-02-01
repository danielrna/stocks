import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-colocation',
  templateUrl: './colocation-page.component.html',
  styleUrls: ['./colocation-page.component.scss']
})
export class ColocationPageComponent implements OnInit {
  //input
  nbroom: number = 3;
  roomPrice: number = 300;
  price: number = 90000;
  travaux: number = 0;
  apport: number = 10000;
  tauxCredit: number = 1.5;
  dureeCredit: number = 25;
  meubles: number = 10000;
  copro: number = 0;
  impots: number = 10;
  tf: number = 1500;
  pno: number = 30;
  autre: number = 0;
  cfe: number = 30;
  entretien: number = 0;


  //calculated
  monthlyExpenses: any;
  notaire: number = 0;
  tfMensuelle: number = 0;
  monthlyRent: number = 0;
  totalEmprunte: number = 0;
  cashflow: number = 0;
  gestion: number = 0;
  mensualiteCredit: number = this.PMT();

  ngOnInit(): void {
    this.calculateAllFields()
  }

  calculateAllFields() {

    this.tfMensuelle = this.tf / 12;
    this.monthlyRent = this.nbroom * this.roomPrice
    this.gestion = Math.round(0.08 * this.monthlyRent);
    this.notaire = 0.08 * this.price
    this.totalEmprunte = this.travaux + this.meubles + this.price + this.notaire - this.apport;
    this.mensualiteCredit = this.PMT()
    this.monthlyExpenses = this.copro + this.impots + this.tfMensuelle + this.pno + this.autre + this.cfe + this.entretien + this.mensualiteCredit + this.gestion
    this.cashflow = this.monthlyRent - this.monthlyExpenses
  }


  PMT() {
    let rate = this.tauxCredit / 100 / 12
    let nperiod = this.dureeCredit * 12
    let pv = this.totalEmprunte
    let fv = 0;
    let type = 1;

    if (rate == 0) return -(pv + fv) / nperiod;

    const pvif = Math.pow(1 + rate, nperiod);
    let pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
      pmt /= (1 + rate);
    }

    return Math.round(-pmt);
  }

  getCashflowClassName() {
    let color: string = "red"
    if (this.cashflow > 0) {
      color = "green"
    }
    return "light-" + color + "-input"
  }


}
