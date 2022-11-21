import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {RootState} from "./store/user/rootState";
import {getCurrentUser} from "./store/user/actions/user.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<RootState>) {
    this.store.dispatch(getCurrentUser());
  }

}
