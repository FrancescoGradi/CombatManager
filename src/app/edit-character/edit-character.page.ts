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
    private actualDamages: number;
    private actualHits: string;
    private actualArmor: number;
    private actualFortitude: number;
    private actualReflex: number;
    private actualWill: number;

    private computeDamage: any;

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {
        this.charToEdit = this.router.getCurrentNavigation().extras.state.char;
        this.allChar = this.router.getCurrentNavigation().extras.state.allCharacters;
        this.buffs = this.router.getCurrentNavigation().extras.state.buffs;

        this.actualDamages = this.router.getCurrentNavigation().extras.state.actualDamages;
        this.actualHits = this.router.getCurrentNavigation().extras.state.actualHits;
        this.actualArmor = this.router.getCurrentNavigation().extras.state.actualArmor;
        this.actualFortitude = this.router.getCurrentNavigation().extras.state.actualFortitude;
        this.actualReflex = this.router.getCurrentNavigation().extras.state.actualReflex;
        this.actualWill = this.router.getCurrentNavigation().extras.state.actualWill;

        this.computeDamage = this.router.getCurrentNavigation().extras.state.computeDamage;
    }

    ngOnInit() {
    }

    editCharacter() {

        this.storage.get('db').then((db) => {

            db[this.charToEdit.name] = this.charToEdit;
            this.storage.set('db', db);

            console.log(this.charToEdit);

            let indexToRemove = this.allChar.indexOf(<GameCharacters>this.charToEdit);

            if (indexToRemove > -1) {
                this.allChar.splice(indexToRemove, 1);
                this.allChar.push(this.charToEdit);
                // console.log(this.allChar);
            }

            this.buffs.push(null);
            indexToRemove = this.buffs.indexOf(<Buff>null);
            if (indexToRemove > -1) {
                this.buffs.splice(indexToRemove, 1);
            }


            // this.reCalcStats(this.charToEdit.buffs);

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

    fromScoreToModifier(score: number) {
        return Math.floor((score - 10) / 2);
    }

    reCalcStats(buffs: Buff[]) {

        let actualDamagesCalc = this.fromScoreToModifier(this.charToEdit.characteristics.strength);
        let actualHitsCalc = Number(this.fromScoreToModifier(this.charToEdit.characteristics.strength))
            + Number(this.charToEdit.bab);

        let actualArmorCalc = Number(this.charToEdit.ac);

        let actualFortitudeCalc = Number(this.charToEdit.st.fortitude)
            + Number(this.fromScoreToModifier(this.charToEdit.characteristics.constitution));
        let actualReflexCalc = Number(this.charToEdit.st.reflex)
            + Number(this.fromScoreToModifier(this.charToEdit.characteristics.dexterity));
        let actualWillCalc = Number(this.charToEdit.st.will)
            + Number(this.fromScoreToModifier(this.charToEdit.characteristics.wisdom));

        let extra_attacks = 0;

        for (const buff of buffs) {
            if (buff.selected === true) {
                actualDamagesCalc += buff.damage;
                actualDamagesCalc += Math.floor(buff.strength_bonus / 2);
                actualHitsCalc += buff.hit;
                actualHitsCalc += Math.floor(buff.strength_bonus / 2);
                actualArmorCalc += Math.floor(buff.ac);
                actualFortitudeCalc += Math.floor(buff.fortitude);
                actualFortitudeCalc += Math.floor(buff.constitution_bonus / 2);
                actualReflexCalc += Math.floor(buff.reflex);
                actualReflexCalc += Math.floor(buff.dexterity_bonus / 2);
                actualWillCalc += Math.floor(buff.will);
                actualWillCalc += Math.floor(buff.wisdom_bonus / 2);
                extra_attacks += buff.extra_attack;
            }
        }

        this.actualDamages = actualDamagesCalc;
        this.actualHits = String(actualHitsCalc);
        this.actualArmor = actualArmorCalc;
        this.actualFortitude = actualFortitudeCalc;
        this.actualReflex = actualReflexCalc;
        this.actualWill = actualWillCalc;

        let extra_attacksTmpString = '';
        for(let i = 0; i < extra_attacks; i++) {
            extra_attacksTmpString = extra_attacksTmpString.concat('/', this.actualHits);
        }
        this.actualHits = this.actualHits.concat(extra_attacksTmpString);

        // routine per attacchi secondari
        // @ts-ignore
        if (this.charToEdit.bab >= 6) {
            // @ts-ignore
            this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
            // @ts-ignore
            if (this.charToEdit.bab >= 11) {
                // @ts-ignore
                this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 10));
                // @ts-ignore
                if (this.charToEdit.bab >= 16) {
                    // @ts-ignore
                    this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 15));
                }
            }
        }
    }
}
