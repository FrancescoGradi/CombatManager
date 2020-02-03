import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-double-check-buff-dialog',
  templateUrl: './double-check-buff-dialog.component.html',
  styleUrls: ['./double-check-buff-dialog.component.scss'],
})
export class DoubleCheckBuffDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

}
