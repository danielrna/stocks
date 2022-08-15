import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {getHouseTypeValues, House, HouseType} from "../../../domain/model/House";
import {HouseService} from "../../../domain/house.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-invest-profile',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {

  houses: House[] = [];
  displayedColumns = ["name", "type", "value", "actions"];

  houseTypes = HouseType;
  houseTypesValues: string[] = getHouseTypeValues();

  creationMode: boolean = false;
  newHouse: House = {
    type: HouseType.APPART,
    name: "Nouveau bien",
    acquisitionPrice: 250000,
    city: "Rennes",
    acquisitionDate: this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
  } as House;

  constructor(
    public auth: AuthenticationService,
    public houseService: HouseService,
    private router: Router,
    private datePipe: DatePipe,
    public dialog: MatDialog) {
    console.log(this.houseTypes)
  }


  ngOnInit(): void {
    this.refreshHouses();
  }

  private refreshHouses() {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.newHouse.userId = user.uid
        this.houseService.getHousesByUserId(user.uid).subscribe(houses => {
          this.houses = houses
        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }

  saveNewHouse() {
    this.houseService.createOrUpdateHouse(this.newHouse).subscribe(() => {
      this.creationMode = false
      this.refreshHouses()
    })
  }

  deleteHouse(id: string) {
    this.houseService.deleteHouse(id)
    this.refreshHouses()

  }

  toApiHouseType(type: string): string {
    switch (type) {
      case HouseType[HouseType.APPART]:
        return "Appartement"
      case HouseType[HouseType.BATEAU]:
        return "Bateau/Péniche"
      case HouseType[HouseType.IMMEUBLE]:
        return "Immeuble"
      case HouseType[HouseType.MAISON]:
        return "Maison"
      default:
        return "Inconnu"
    }
  }
}
