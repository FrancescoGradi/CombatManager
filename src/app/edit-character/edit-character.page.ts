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

    charToEdit: GameCharacters;
    allChar: GameCharacters[];
    classes: string[] = ['Guerriero', 'Mago', 'Ranger', 'Bardo', 'Stregone', 'Ladro', 'Barbaro', 'Paladino', 'Chierico'];
    sizes: string[] = ['Piccolissima', 'Minuta', 'Minuscola', 'Piccola', 'Media', 'Grande', 'Enorme', 'Gigantesca', 'Colossale'];
    levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    attackTypes: string[] = ['mischia', 'distanza'];
    selected = this.classes[0];

    private buffs: Buff[];
    private actualGameCharacter: GameCharacters;

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {
        this.charToEdit = this.router.getCurrentNavigation().extras.state.char;
        this.allChar = this.router.getCurrentNavigation().extras.state.allCharacters;
        this.actualGameCharacter = this.router.getCurrentNavigation().extras.state.actualGameCharacter;
        this.buffs = this.router.getCurrentNavigation().extras.state.buffs;
    }

    ngOnInit() {
    }

    editCharacter() {

        this.storage.get('db').then((db) => {

            db[this.charToEdit.name] = this.charToEdit;
            this.storage.set('db', db);

            this.actualGameCharacter = this.charToEdit;

            this.router.navigate(['home']);
        });

    }

    deleteCharacter() {

        const toRemove = this.allChar.indexOf(this.charToEdit);

        if (toRemove > -1) {
            this.allChar.splice(toRemove, 1);
            this.storage.get('db').then((db) => {

                delete db[this.charToEdit.name];
                this.storage.set('db', db);

                if (this.allChar.length === 0) {
                    this.router.navigate(['add-character'], {state: {allCharacters: this.allChar}});
                } else {
                    this.router.navigate(['home']);
                }
            });
        }
    }
}
