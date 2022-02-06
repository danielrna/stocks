import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../domain/authentication.service";
import {UserService} from "../../../domain/user.service";
import {Router} from "@angular/router";
import {FullUser} from "../../../domain/model/FullUser";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  constructor(private auth: AuthenticationService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {


  }

}
