import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../domain/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  connexion() {
    console.log("Connecting...")
    this.authenticationService.signIn(this.email, this.password)
  }

  connexionGoogle() {
    console.log("Connecting with google...")
    this.authenticationService.googleAuth().then(r => console.log("connexion google"))
  }
  connexionFacebook() {
    console.log("Connecting with fb...")
    this.authenticationService.fbAuth().then(r => console.log("connexion fb"))
  }
}
