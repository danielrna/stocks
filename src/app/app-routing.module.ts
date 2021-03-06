import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CryptoPageComponent} from "./components/crypto-page/crypto-page.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {SignupPageComponent} from "./components/signup-page/signup-page.component";
import {ProjectsComponent} from "./components/account/projects/projects.component";
import {ColocationProjectComponent} from "./components/colocation-project/colocation-project.component";
import {PersonalDataComponent} from "./components/account/personal-data/personal-data.component";
import {AccountPageComponent} from "./components/account/account-page/account-page.component";
import {IncomesComponent} from "./components/account/incomes/incomes.component";
import {DashboardComponent} from "./components/account/dashboard/dashboard.component";
import {DebtsComponent} from "./components/account/debts/debts.component";
import {NewProjectPageComponent} from "./components/new-project-page/new-project-page.component";
import {ChargesComponent} from "./components/account/charges/charges.component";

const routes: Routes = [
  {path: 'crypto', component: CryptoPageComponent},
  {path: 'colocation/:id', component: ColocationProjectComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'newProject', component: NewProjectPageComponent},
  {
    path: 'account', component: AccountPageComponent, children: [
      {
        path: 'projects',
        component: ProjectsComponent
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
        path: 'debts',
        component: DebtsComponent
      }, {
        path: 'charges',
        component: ChargesComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
