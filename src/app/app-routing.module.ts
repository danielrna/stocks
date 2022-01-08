import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockPickerComponent} from "./stock-picker/stock-picker.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: 'stock-picker', component: StockPickerComponent},
  {path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
