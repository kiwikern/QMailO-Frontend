import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class InfoSnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string) {
    this.snackBar.open(message, 'OK', {duration: 3000});
  }

}
