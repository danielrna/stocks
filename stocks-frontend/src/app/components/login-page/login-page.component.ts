import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../domain/authentication.service";
import {Observable} from "rxjs";
import {DomainUser} from "../../domain/model/DomainUser";
import {select, Store} from "@ngrx/store";
import {selectUser} from "../../store/user/selectors/user.selectors";
import {SelfRootState} from "../../store/user/rootState";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email: string = "";
  password: string = "";

  currentUser: Observable<DomainUser> = this.rootStore.pipe(select(selectUser))

  constructor(private authenticationService: AuthenticationService, private rootStore: Store<SelfRootState>, private router: Router) {

  }

  ngOnInit(): void {
    this.currentUser.subscribe(user => {
      if(user.uid) {
        this.router.navigate(["/account/dashboard"])
      }
    })
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
