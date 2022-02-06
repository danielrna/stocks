import {Component, OnInit} from '@angular/core';
import {FullUser} from "../../../domain/model/FullUser";
import {AuthenticationService} from "../../../domain/authentication.service";
import {UserService} from "../../../domain/user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-invest-profile',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent implements OnInit {

  fullUser: FullUser = <FullUser>{};

  constructor(
    public auth: AuthenticationService,
    public userService: UserService,
    private router: Router,
    public dialog: MatDialog) {
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

}
