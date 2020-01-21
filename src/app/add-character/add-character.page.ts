import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.page.html',
  styleUrls: ['./add-character.page.scss'],
})
export class AddCharacterPage implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  classes: string[] = ['Guerriero', 'Mago', 'Ranger', 'Bardo'];
  selected = this.classes[0];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
