import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {UserService} from "../../../domain/user.service";
import {ProjectService} from "../../../domain/project.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {FullUser} from "../../../domain/model/FullUser";
import {DomainUser} from "../../../domain/model/DomainUser";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  fullUser: FullUser = {} as FullUser;


  constructor(
    public auth: AuthenticationService,
    public userService: UserService,
    public projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog,
    public datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.userService.getFullUser(user.uid).subscribe(fullUser => {
          this.fullUser = fullUser
        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }

  updateUser() {
    this.userService.saveUser(this.fullUser as DomainUser).then(r => {
    })
  }
}
