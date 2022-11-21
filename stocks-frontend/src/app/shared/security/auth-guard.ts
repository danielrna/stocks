import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {tap} from "rxjs/internal/operators/tap";
import {RootState} from "../../store/user/rootState";
import {isLoggedIn} from "../../store/user/selectors/user.selectors";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<RootState>,
    private route: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(isLogged => {
        if (!isLogged) {
          this.route.navigateByUrl('login')
        }

      })
    )
  }
}
