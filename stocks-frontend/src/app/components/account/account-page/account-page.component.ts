import {Component, OnInit} from '@angular/core';
import {RootState} from "../../../store/user/rootState";
import {Store} from "@ngrx/store";
import {getCurrentUser} from "../../../store/user/actions/user.actions";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  constructor(private store: Store<RootState>) {
    this.store.dispatch(getCurrentUser());
  }

  ngOnInit(): void {

  }

}
