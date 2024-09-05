import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  handleError(e: any,methodName:string, res = undefined){
      this.snackBar.open(`${e.error.message}( ${methodName} )`, 'Close')
      return of(res)
  }
}
