import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../domain/authentication.service";
import firebase from "firebase/compat";
import {DomainUser} from "../../domain/model/DomainUser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: DomainUser = <DomainUser>{};

  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.getCurrentUser().subscribe(value => {
      if(value) this.user = value
    })
  }

  signOut() {
    this.authenticationService.signOut()
  }


}
