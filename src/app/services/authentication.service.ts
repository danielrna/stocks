import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastService} from "./toast.service";
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {User} from "./model/User";
import firebase from "firebase/compat/app";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;

  constructor(private angularFireAuth: AngularFireAuth, private toastService: ToastService, private router: Router, private afs: AngularFirestore,) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        let localUser = localStorage.getItem('user')
        localUser ? JSON.parse(localUser) : null;
      } else {
        localStorage.removeItem('user');
        let localUser = localStorage.getItem('user')
        localUser ? JSON.parse(localUser) : null;
      }
    })

  }

  /* Sign up */
  signUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.sendVerificationMail().then(value => {
          console.log("value=" + value)
          // this.setUserData(value.user);
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
        this.toastService.showToast("Login successful", ['success', 'notification'])
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

  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  sendVerificationMail() {
    return this.angularFireAuth.currentUser.then(user => {
      user?.sendEmailVerification()
    }).then(() => {
      this.router.navigate(['verify-email-address']).then(r => console.log(r));
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
      }).catch((error) => {
        console.log(error)
      })
  }
}
