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
        this.toastService.showToast("Signup successful", ['success', 'notification'])
      })
      .catch(err => {
        this.toastService.showToast("Signup failed : " + err.message, ['error', 'notification'])
      });
  }

  /* Sign in */
  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.toastService.showToast("Login successful", ['success', 'notification'])
      })
      .catch(err => {
        this.toastService.showToast("Authentication failed : " + err.message, ['error', 'notification'])
      });
  }

  /* Sign out */
  signOut() {
    this.angularFireAuth
      .signOut().then(r => console.log("You're out !"));
  }


}
