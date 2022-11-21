import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastService} from "./toast.service";
import {Router} from "@angular/router";
import {DomainUser} from "./model/DomainUser";
import firebase from "firebase/compat/app";
import {UserRepository} from "../data/user.respository";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: firebase.User = {} as firebase.User;

  constructor(private angularFireAuth: AngularFireAuth, private toastService: ToastService, private router: Router, private userRepository: UserRepository) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
    })
  }

  /* Sign up */
  signUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: UserCredential) => {
        this.sendVerificationMail().then(value => {
          this.setUserData(result.user!!)
        });
        this.toastService.showToast("Signup successful. Check your emails.", ['success', 'notification'])
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
        this.setUserData(res.user!!)
        this.router.navigate(["/account/dashboard"])
          .then(r => this.toastService.showToast("Login successful", ['success', 'notification'])
          )
      })
      .catch(err => {
        this.toastService.showToast("Authentication failed : " + err.message, ['error', 'notification'])
      });
  }

  /* Sign out */
  signOut() {
    this.angularFireAuth
      .signOut().then(r =>
      this.router.navigate(["login"])
        .then(r => window.location.reload())
    );
  }

  sendVerificationMail() {
    return this.angularFireAuth.currentUser.then((user) => {
      user?.sendEmailVerification()
    }).then(() => {
      this.router.navigate(['verify-email-address'])
    })
  }

  fbAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  googleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: AuthProvider) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!')
        this.setUserData(result.user!!)
        this.router.navigate(["/account/dashboard"])
          .then(r => this.toastService.showToast("Login successful", ['success', 'notification'])
          )
      }).catch((error) => {
        console.log(error)
      })
  }


  getCurrentUser(): Observable<DomainUser | null> {
    return this.angularFireAuth.user.pipe(map(value => {
      if (value) {
        return AuthenticationService.toDomain(value)
      } else return null
    }))
  }

  setUserData(user: firebase.User) {
    this.userRepository.saveUser(AuthenticationService.toDomain(user)).then()
  }

  private static toDomain(user: firebase.User): DomainUser {
    if (!user.email) {
      throw Error("User has no email");
    } else {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        emailVerified: user.emailVerified
      } as DomainUser
    }
  }

}
