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
  pno: number = 500;
  autre: number = 0;
  cfe: number = 400;
  entretien: number = 0;
  meubles: number = 10000;
  mensualiteCredit: number = this.PMT();
  gestion: number = 0;
  totalEmprunte: number = 0;
  tfMensuelle: number = 0;
  totalDepenses: any;

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
    this.setTotalDepenses()
  }

  setTfMensuelle() {
    this.tfMensuelle = this.tf / 12;
  }

  setGestion() {
    this.gestion = 0.08 * this.monthlyRent;
  }

  setTotalEmprunte() {
    this.totalEmprunte = this.travaux + this.meubles + this.price + this.notaire - this.apport;
  }

  setMonthlyRent() {
    this.monthlyRent = this.nbroom * this.roomprice
  }

  setNotaireAncien() {
    this.notaire = 0.08 * this.price
  }

  setMensualiteCredit() {
    this.mensualiteCredit = this.PMT()
  }

  PMT() {
    let rate = this.tauxCredit / 100 / 12
    console.log("rate=" + rate)
    let nperiod = this.dureeCredit * 12
    console.log("nperiod=" + nperiod)
    let pv = this.totalEmprunte
    console.log("pv=" + pv)

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


  private setTotalDepenses() {
    this.totalDepenses = this.copro + this.impots + this.tf + this.pno + this.autre + this.cfe + this.entretien + this.mensualiteCredit
  }
}
