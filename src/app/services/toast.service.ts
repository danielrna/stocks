import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../components/snackbar/snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) {
  }

  showToast(message: string, panelClass : string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        type : panelClass
      },
      duration: 5000
    })

  }

}
