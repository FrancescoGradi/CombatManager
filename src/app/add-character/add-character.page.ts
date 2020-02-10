import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Buff, Characteristics, GameCharacters } from '../home/home.page';
import { MatDialog } from '@angular/material/dialog';
import {ClassDialogComponent} from '../class-dialog/class-dialog.component';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.page.html',
  styleUrls: ['./add-character.page.scss'],
})
export class AddCharacterPage implements OnInit {

  constructor(private _formBuilder: FormBuilder, public navCtrl: NavController, public storage: Storage, public router: Router,
              public dialog: MatDialog) {
    try {
      this.allCharacters = this.router.getCurrentNavigation().extras.state.allCharacters;
      this.actualGameCharacter = this.router.getCurrentNavigation().extras.state.actualGameCharacter;
      this.selection = this.router.getCurrentNavigation().extras.state.selection;
    } catch (e) {
      this.allCharacters = [];
      this.actualGameCharacter = null;
      this.selection = '';
    }
  }

  allCharacters: GameCharacters[];
  actualGameCharacter: GameCharacters;
  selection: string;
  character: GameCharacters = {
    name: null,
    classe: null,
    race: null,
    level: 1,
    characteristics: {strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10},
    buffs: [],
    ac: null,
    hp: null,
    bab: null,
    initiative: null,
    weapon_dice: null,
    size: null,
    typeAttack: 'mischia',
    type_weapon: 'a una mano',
    st: {fortitude: null, reflex: null, will: null},
  };

  classes: string[] = ['Guerriero', 'Mago', 'Ranger', 'Bardo', 'Stregone', 'Ladro', 'Barbaro', 'Paladino', 'Chierico'];
  sizes: string[] = ['Piccolissima', 'Minuta', 'Minuscola', 'Piccola', 'Media', 'Grande', 'Enorme', 'Gigantesca', 'Colossale'];
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  attackTypes: string[] = ['mischia', 'distanza'];
  weaponTypes: string[] = ['a una mano', 'a due mani'];

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

  saveCharacter($event: MouseEvent) {

    if (this.character.ac === null || this.character.ac < 0) {
      this.character.ac = 0;
    }

    if (this.character.bab === null || this.character.bab < 0) {
      this.character.bab = 0;
    }

    if (this.character.hp === null || this.character.hp < 1) {
      this.character.hp = 1;
    }

    if (this.character.initiative === null) {
      this.character.initiative = this.fromScoreToModifier(this.character.characteristics.dexterity);
    }

    if (this.character.weapon_dice === null || this.character.weapon_dice === '') {
      this.character.weapon_dice = '1d8';
    }

    if (this.character.st.fortitude === null || this.character.st.fortitude < 0) {
      this.character.st.fortitude = 0;
    }

    if (this.character.st.reflex === null || this.character.st.reflex < 0) {
      this.character.st.reflex = 0;
    }

    if (this.character.st.will === null || this.character.st.will < 0) {
      this.character.st.will = 0;
    }

    this.storage.get('db').then((db => {

      db[this.character.name] = this.character;
      this.storage.set('db', db);

      this.allCharacters.push(this.character);
      this.actualGameCharacter = this.character;
      this.selection = this.character.name;

      this.router.navigate(['home']);

    }));

  }

  openDialog() {
    let dialogRef = this.dialog.open(ClassDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
       this.classes.push(result);
    });
  }

  fromScoreToModifier(score: number) {
    return Math.floor((score - 10) / 2);
  }

}
