import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CryptoPageComponent} from "./components/crypto-page/crypto-page.component";
import {HomeComponent} from "./components/home/home.component";
import {ColocationPageComponent} from "./components/colocation-page/colocation-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";

const routes: Routes = [
  {path: 'crypto', component: CryptoPageComponent},
  {path: 'colocation', component: ColocationPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
