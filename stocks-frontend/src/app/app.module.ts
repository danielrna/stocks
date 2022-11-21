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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SignupPageComponent} from './components/signup-page/signup-page.component';
import {MatListModule} from "@angular/material/list";
import {
  ColocationProjectFormComponent
} from './components/account/projects/colocation-project-form/colocation-project-form.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {PersonalDataComponent} from "./components/account/personal-data/personal-data.component";
import {LeftMenuComponent} from './components/account/left-menu/left-menu.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {AccountPageComponent} from './components/account/account-page/account-page.component';
import {ProjectsComponent} from "./components/account/projects/projects.component";
import {IncomesComponent} from './components/account/incomes/incomes.component';
import {DashboardComponent} from './components/account/dashboard/dashboard.component';
import {LayoutModule} from '@angular/cdk/layout';
import {DashCardComponent} from './components/account/dashboard/dashcard/dash-card.component';
import {DoughnutChartComponent} from './components/account/dashboard/charts/doughnut-chart/doughnut-chart.component';
import {NgChartsModule} from 'ng2-charts';
import {LoansComponent} from './components/account/loans/loans.component';
import {NewProjectPageComponent} from './components/account/projects/new-project-page/new-project-page.component';
import {HousesComponent} from './components/account/houses/houses.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProjectsListComponent} from "./components/account/projects/projects-list/projects-list.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatStepperModule} from "@angular/material/stepper";
import {ProjectFormComponent} from "./components/account/projects/project-form/project-form.component";
import {LcdProjectFormComponent} from "./components/account/projects/lcd-project-form/lcd-project-form.component";
import {StoreModule} from "@ngrx/store";
import {PROJECT_FEATURE_KEY, projectReducer} from "./store/project/reducers/project.reducer";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {ProjectEffects} from "./store/project/effects/project.effects";
import {UserEffects} from "./store/user/effects/user.effects";
import {ROOT_FEATURE_KEY, userReducer} from "./store/user/reducers/user.reducer";
import {metaReducers} from "./store/user/rootState";
import {AuthGuard} from './shared/security/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    CryptoPageComponent,
    HomeComponent,
    NavbarComponent,
    LoginPageComponent,
    SnackbarComponent,
    SignupPageComponent,
    ProjectsComponent,
    ColocationProjectFormComponent,
    LcdProjectFormComponent,
    ProjectFormComponent,
    ConfirmDialogComponent,
    PersonalDataComponent,
    LeftMenuComponent,
    AccountPageComponent,
    IncomesComponent,
    DashboardComponent,
    DashCardComponent,
    DoughnutChartComponent,
    LoansComponent,
    NewProjectPageComponent,
    ProjectsListComponent,
    HousesComponent,
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
    MatSidenavModule,
    LayoutModule,
    NgChartsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    StoreModule.forRoot({
        [ROOT_FEATURE_KEY]: userReducer,
        [PROJECT_FEATURE_KEY]: projectReducer
      }, {metaReducers: metaReducers}
    ),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([ProjectEffects, UserEffects]),
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
