import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss'],
})
export class ClassDialogComponent implements OnInit {

  text: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

}
