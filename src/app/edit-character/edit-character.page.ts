import { Component, OnInit } from '@angular/core';
import {Buff, GameCharacters} from '../home/home.page';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.page.html',
  styleUrls: ['./edit-character.page.scss'],
})
export class EditCharacterPage implements OnInit {

  constructor( public navCtrl: NavController, public storage: Storage, public router: Router ) {

  }

  charToEdit: GameCharacters;
  classes: string[] = ['Guerriero', 'Mago', 'Ranger', 'Bardo', 'Stregone', 'Ladro', 'Barbaro', 'Paladino', 'Chierico'];
  sizes: string[] = ['Piccolissima', 'Minuta', 'Minuscola', 'Piccola', 'Media', 'Grande', 'Enorme', 'Gigantesca', 'Colossale'];
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  selected = this.classes[0];

  ngOnInit() {
  }

  editCharacter() {

  }

  deleteCharacter() {
    /*
    let indexToRemove = this.buffs.indexOf(<Buff>this.buffToEdit);

    console.log(this.buffs);
    console.log(this.buffToEdit);
    console.log(indexToRemove);

    if (indexToRemove > -1) {
      this.buffs.splice(indexToRemove, 1);
      this.storage.get('db').then((db) => {

        db[this.actualGameCharacter].buffs = this.buffs;
        this.storage.set('db', db);

        this.router.navigate(['home']);
      });
    }*/
  }

}
