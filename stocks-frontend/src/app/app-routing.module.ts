import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CryptoPageComponent} from "./components/crypto-page/crypto-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {SignupPageComponent} from "./components/signup-page/signup-page.component";
import {ProjectsComponent} from "./components/account/projects/projects.component";
import {
  ColocationProjectFormComponent
} from "./components/account/projects/colocation-project-form/colocation-project-form.component";
import {PersonalDataComponent} from "./components/account/personal-data/personal-data.component";
import {AccountPageComponent} from "./components/account/account-page/account-page.component";
import {IncomesComponent} from "./components/account/incomes/incomes.component";
import {DashboardComponent} from "./components/account/dashboard/dashboard.component";
import {LoansComponent} from "./components/account/loans/loans.component";
import {NewProjectPageComponent} from "./components/account/projects/new-project-page/new-project-page.component";
import {HousesComponent} from "./components/account/houses/houses.component";
import {ProjectsListComponent} from "./components/account/projects/projects-list/projects-list.component";
import {LcdProjectFormComponent} from "./components/account/projects/lcd-project-form/lcd-project-form.component";
import {AuthGuard} from "./shared/security/auth-guard";

const routes: Routes = [
  {path: 'crypto', component: CryptoPageComponent},
  // {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '',  pathMatch: 'full',redirectTo: 'account/dashboard'},
  {path: 'signup', component: SignupPageComponent},
  {
    path: 'account',
    canActivate: [AuthGuard], // This is an array because we can add multiple guards
    component: AccountPageComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsComponent,
        children: [
          {path: '', component: ProjectsListComponent},
          {path: 'new', component: NewProjectPageComponent},
          {path: 'colocation/:id', component: ColocationProjectFormComponent},
          {path: 'lcd/:id', component: LcdProjectFormComponent},
        ]
      }, {
        path: 'dashboard',
        component: DashboardComponent
      }, {
        path: 'personalData',
        component: PersonalDataComponent
      }, {
        path: 'incomes',
        component: IncomesComponent
      }, {
        path: 'loans',
        component: LoansComponent
      }, {
        path: 'houses',
        component: HousesComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
