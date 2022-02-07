import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CryptoPageComponent} from "./components/crypto-page/crypto-page.component";
import {HomeComponent} from "./components/home/home.component";
import {ColocationPageComponent} from "./components/colocation-page/colocation-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {SignupPageComponent} from "./components/signup-page/signup-page.component";
import {ProjectsComponent} from "./components/account/projects/projects.component";
import {ColocationProjectComponent} from "./components/colocation-project/colocation-project.component";
import {PersonalDataComponent} from "./components/account/personal-data/personal-data.component";
import {AccountPageComponent} from "./components/account/account-page/account-page.component";
import {IncomesComponent} from "./components/account/incomes/incomes.component";
import {DashboardComponent} from "./components/account/dashboard/dashboard.component";

const routes: Routes = [
  {path: 'crypto', component: CryptoPageComponent},
  {path: 'colocation', component: ColocationPageComponent},
  {path: 'colocation/:id', component: ColocationProjectComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
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
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
