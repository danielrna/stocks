import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CryptoPageComponent} from "./crypto-page/crypto-page.component";
import {HomeComponent} from "./home/home.component";
import {ColocationPageComponent} from "./colocation-page/colocation-page.component";

const routes: Routes = [
  {path: 'crypto', component: CryptoPageComponent},
  {path: 'colocation', component: ColocationPageComponent},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
