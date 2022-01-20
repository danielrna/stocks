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

  PMT(): number {
    let pv = this.totalEmprunte
    let i = (1 + this.tauxCredit / 100) ^ (1 / 12)
    let n = this.dureeCredit * 12
    let pmt = (pv) * (i) / (1 - (Math.pow(1 + i, -n)));
    console.log(pmt)

    return pmt
  }

  PMTold(): number {

    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    let pmt;
    let pvif;
    let ir = this.tauxCredit / 100;
    let np = this.dureeCredit * 12;
    let pv = this.totalEmprunte;
    let fv = 0;
    let type = 0;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
      return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = -ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
      pmt /= (1 + ir);

    console.log(pmt)
    return pmt;
  }


}
