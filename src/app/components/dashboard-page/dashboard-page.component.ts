import {Component, OnInit} from '@angular/core';
import {UserService} from "../../domain/user.service";
import {AuthenticationService} from "../../domain/authentication.service";
import {DomainFullUser} from "../../domain/model/DomainFullUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  user: DomainFullUser = <DomainFullUser>{};

  constructor(public authService: AuthenticationService, public userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user !== null) {
        this.userService.getFullUser(user.uid).subscribe(fullUser => {
          this.user = fullUser
        })
      } else this.router.navigate(["login"]).then(r => {
      })
    })
  }

}
