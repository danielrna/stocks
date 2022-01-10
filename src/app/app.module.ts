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
import {CryptoPageComponent} from './crypto-page/crypto-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavbarComponent} from './navbar/navbar.component';
import {ColocationPageComponent} from './colocation-page/colocation-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";

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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
