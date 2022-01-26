import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../domain/authentication.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  email: string = "";
  password: string = "";
  name: string = "";
  lastname: string = "";

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  signup() {
    this.authenticationService.signUp(this.email, this.password)
  }
}
