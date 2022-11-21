import {Injectable} from "@angular/core";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EMPTY} from "rxjs";
import {
  disconnectCurrentUser,
  disconnectCurrentUserSuccess,
  getCurrentUser,
  getCurrentUserUSuccess
} from "../actions/user.actions";
import {ToastService} from "../../../domain/toast.service";
import {AuthenticationService} from "../../../domain/authentication.service";
import {DomainUser} from "../../../domain/model/DomainUser";

@Injectable()
export class UserEffects {


  constructor(private actions$: Actions, private service: AuthenticationService, private toastService: ToastService) {
  }

  getCurrentUser = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUser),
      mergeMap(() => {
        return this.service.getCurrentUser().pipe(
          map((response: DomainUser | null) => {
            if (response == null) throw Error("User not connected !")
            return getCurrentUserUSuccess({user: response})
          }),
          catchError(() => EMPTY),
        )
      })
    )
  )
  disconnectCurrentUser = createEffect(() =>
    this.actions$.pipe(
      ofType(disconnectCurrentUser),
      map(() => {
        this.service.signOut()
        return disconnectCurrentUserSuccess()
      })
    )
  )


}
