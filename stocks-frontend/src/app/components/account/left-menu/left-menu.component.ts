import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {disconnectCurrentUser, getCurrentUser} from "../../../store/user/actions/user.actions";
import {SelfRootState} from "../../../store/user/rootState";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  constructor(public router: Router, public store : Store<SelfRootState>) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(disconnectCurrentUser());
  }
}
