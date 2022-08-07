import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../domain/authentication.service";
import {DomainUser} from "../../domain/model/DomainUser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: DomainUser | null | undefined;
  defaultPhotoUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.getCurrentUser().subscribe(value => {
      this.user = value
    })
  }

  signOut() {
    this.authenticationService.signOut()
  }


}
