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
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
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
import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SignupPageComponent} from './components/signup-page/signup-page.component';
import {MatListModule} from "@angular/material/list";
import {ColocationProjectComponent} from './components/colocation-project/colocation-project.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {PersonalDataComponent} from "./components/account/personal-data/personal-data.component";
import {LeftMenuComponent} from './components/account/left-menu/left-menu.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {AccountPageComponent} from './components/account/account-page/account-page.component';
import {DashboardComponent} from "./components/account/dashboard/dashboard.component";
import { InvestProfileComponent } from './components/account/invest-profile/invest-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    CryptoPageComponent,
    HomeComponent,
    NavbarComponent,
    ColocationPageComponent,
    ColocationPageComponent,
    LoginPageComponent,
    SnackbarComponent,
    SignupPageComponent,
    DashboardComponent,
    ColocationProjectComponent,
    ConfirmDialogComponent,
    PersonalDataComponent,
    LeftMenuComponent,
    AccountPageComponent,
    InvestProfileComponent,
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
    MatAutocompleteModule,
    MatListModule,
    MatDialogModule,
    MatSidenavModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
