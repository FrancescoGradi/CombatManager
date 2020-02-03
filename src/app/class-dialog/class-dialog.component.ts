import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss'],
})
export class ClassDialogData {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ClassDialog, {
      data: {
        animal: 'panda'
      }
    });
  }
}

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
})
export class ClassDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ClassDialogData) {}
}
