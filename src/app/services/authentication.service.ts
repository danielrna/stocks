import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {ToastService} from "./toast.service";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<User | null | undefined>;

  constructor(private angularFireAuth: AngularFireAuth, private toastService: ToastService) {
    this.userData = angularFireAuth.authState;

  }

  /* Sign up */
  signUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.toastService.showToast("Login successful", "success")
      })
      .catch(err => {
        this.toastService.showToast("Authentication failed : "+ err.message, "error")
      });
  }

  /* Sign out */
  signOut() {
    this.angularFireAuth
      .signOut().then(r => console.log("You're out !"));
  }


}
