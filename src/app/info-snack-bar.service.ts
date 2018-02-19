import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Injectable()
export class InfoSnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, action = 'OK', duration = 5000): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {duration});
  }

}
