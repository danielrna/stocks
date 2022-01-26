import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../domain/authentication.service";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authenticationService.signOut()
  }

  getUser() : User {
    let user = this.authenticationService.userData
    console.log("user=" + JSON.stringify(user))
    return user
  }
}
