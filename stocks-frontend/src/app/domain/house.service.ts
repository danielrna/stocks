import {Injectable} from '@angular/core';
import {HouseRespository} from "../data/house.respository";
import {ToastService} from "./toast.service";
import {House} from "./model/House";
import {Observable} from "rxjs";
import {ProjectRepository} from "../data/project-repository.service";
import {ProjectService} from "./project.service";

@Injectable({
  providedIn: 'root'
})
export class HouseService {


  constructor(private houseRespository: HouseRespository,
              private projectRespository: ProjectRepository,
              private projectService: ProjectService,
              private toast: ToastService) {
  }

  createOrUpdateHouse(house: House): Observable<House> {
    let obs;
    if (house.id != null) {
      obs = this.houseRespository.updateHouse(house)
    } else {
      obs = this.houseRespository.createHouse(house)
    }
    return obs
  }

  deleteHouse(id: string) {
    return this.houseRespository.deleteHouse(id).subscribe(() => {
      this.toast.showToast("House Deleted", ["success"])
    })

  }

  getHousesByUserId(id: string): Observable<House[]> {
    return this.houseRespository.getHousesByUserId(id)
  }


}
