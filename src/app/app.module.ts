import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {AppComponent} from './app.component';
import {CryptoPageComponent} from './components/crypto-page/crypto-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarComponent} from './components/navbar/navbar.component';
import {ColocationPageComponent} from './components/colocation-page/colocation-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {environment} from "src/environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {LoginPageComponent} from './components/login-page/login-page.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { SignupPageComponent } from './components/signup-page/signup-page.component';

const materialModules = [
  MatIconModule,
  MatSnackBarModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTableDataSource,

];

@NgModule({
  declarations: [
    AppComponent,
    CryptoPageComponent,
    HomeComponent,
    NavbarComponent,
    ColocationPageComponent,
    LoginPageComponent,
    SnackbarComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
