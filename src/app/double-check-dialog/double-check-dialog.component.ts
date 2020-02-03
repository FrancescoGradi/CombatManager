import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-double-check-dialog',
  templateUrl: './double-check-dialog.component.html',
  styleUrls: ['./double-check-dialog.component.scss'],
})
export class DoubleCheckDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

}
