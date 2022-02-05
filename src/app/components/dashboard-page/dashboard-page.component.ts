import {Component, OnInit} from '@angular/core';
import {UserService} from "../../domain/user.service";
import {AuthenticationService} from "../../domain/authentication.service";
import {FullUser} from "../../domain/model/FullUser";
import {Router} from "@angular/router";
import {ProjectService} from "../../domain/project.service";
import {DomainUser} from "../../domain/model/DomainUser";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  fullUser: FullUser = <FullUser>{};

  constructor(public authService: AuthenticationService, public userService: UserService, public projectService: ProjectService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
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

  goToProject(id: string) {
    this.router.navigate(['/colocation', id]).then(r => {
    })
  }
}
