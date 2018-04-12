import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Main } from '../../main';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {


    public title: string;
    public message: string;

      main: any = new Main;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

    }
}
