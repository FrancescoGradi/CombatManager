import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import {Buff, Characteristics, GameCharacters} from '../home/home.page';
import {ClassDialog, ClassDialogData} from '../class-dialog/class-dialog.component';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.page.html',
  styleUrls: ['./add-character.page.scss'],
})
export class AddCharacterPage implements OnInit {

  constructor(private _formBuilder: FormBuilder, public navCtrl: NavController, public storage: Storage, public router: Router) {
    try {
      this.allCharacters = this.router.getCurrentNavigation().extras.state.allCharacters;
    } catch (e) {
      this.allCharacters = [];
    }
  }

  allCharacters: GameCharacters[];
  character: GameCharacters = {
    name: null,
    classe: null,
    race: null,
    level: 1,
    characteristics: {strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10},
    buffs: [],
    ac: 0,
    hp: 1,
    bab: 0,
    initiative: 0,
    weapon_dice: null,
    size: null,
    typeAttack: 'mischia',
    st: {fortitude: 0, reflex: 0, will: 0},
  };

  classes: string[] = ['Guerriero', 'Mago', 'Ranger', 'Bardo', 'Stregone', 'Ladro', 'Barbaro', 'Paladino', 'Chierico'];
  sizes: string[] = ['Piccolissima', 'Minuta', 'Minuscola', 'Piccola', 'Media', 'Grande', 'Enorme', 'Gigantesca', 'Colossale'];
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private dialog: ClassDialogData;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  saveCharacter($event: MouseEvent) {

    this.storage.get('db').then((db => {

      db[this.character.name] = this.character;
      this.storage.set('db', db);
      console.log(this.character);

      this.allCharacters.push(this.character);

      this.router.navigate(['home']);

    }));

  }

}
