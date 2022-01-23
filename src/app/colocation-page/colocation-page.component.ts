import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-colocation',
  templateUrl: './colocation-page.component.html',
  styleUrls: ['./colocation-page.component.scss']
})
export class ColocationPageComponent implements OnInit {

  nbroom: number = 3;
  roomprice: number = 300;
  price: number = 90000;
  notaire: number = 0;
  monthlyRent: number = 0;
  travaux: number = 0;
  apport: number = 10000;
  tauxCredit: number = 1.5;
  dureeCredit: number = 25;

  copro: number = 0;
  impots: number = 10;
  tf: number = 1500;
  pno: number = 30;
  autre: number = 0;
  cfe: number = 30;
  entretien: number = 0;
  meubles: number = 10000;
  mensualiteCredit: number = this.PMT();
  gestion: number = 0;
  totalEmprunte: number = 0;
  tfMensuelle: number = 0;
  monthlyExpenses: any;
  cashflow: number = 0;

  ngOnInit(): void {
    this.calculateAllFields()
  }

  calculateAllFields() {
    this.setMonthlyRent();
    this.setTotalEmprunte();
    this.setGestion();
    this.setMensualiteCredit();
    this.setTfMensuelle()
    this.setNotaireAncien()
    this.setMonthlyExpenses()
    this.setCashflow()
  }

  private setTfMensuelle() {
    this.tfMensuelle = this.tf / 12;
  }

  private setGestion() {
    this.gestion = Math.round(0.08 * this.monthlyRent);
  }

  private setTotalEmprunte() {
    this.totalEmprunte = this.travaux + this.meubles + this.price + this.notaire - this.apport;
  }

  private setMonthlyRent() {
    this.monthlyRent = this.nbroom * this.roomprice
  }

  private setNotaireAncien() {
    this.notaire = 0.08 * this.price
  }

  private setMensualiteCredit() {
    this.mensualiteCredit = this.PMT()
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


  private setMonthlyExpenses() {
    this.monthlyExpenses = this.copro + this.impots + this.tfMensuelle + this.pno + this.autre + this.cfe + this.entretien + this.mensualiteCredit + this.gestion
  }

  private setCashflow() {
    this.cashflow = this.monthlyRent - this.monthlyExpenses
  }

  getCashflowClassName() {
    let color: string = "red"
    if (this.cashflow > 0) {
      color = "green"
    }
    return "light-" + color + "-input"
  }


}
