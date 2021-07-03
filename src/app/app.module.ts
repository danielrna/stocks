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
import {StockPickerComponent} from './stock-picker/stock-picker.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { HomeComponent } from './home/home.component';

const materialModules = [
  MatIconModule,
  MatSnackBarModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    AppComponent,
    StockPickerComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
