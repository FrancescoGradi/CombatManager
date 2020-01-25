import {Component, HostBinding, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {MatSelectionList} from '@angular/material';

export interface Characteristics {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface SavingThrows {
    fortitude: number;
    reflex: number;
    will: number;
}

export interface Buff {
    name: string;
    description: string;
    hit: number;
    damage: number;
    ac: number;
    fortitude: number;
    reflex: number;
    will: number;
    extra_attack: number;
    combat_list: boolean;
    ac_list: boolean;
    st_list: boolean;
    type: string;
    selected: boolean;
    strength_bonus: number;
    dexterity_bonus: number;
    constitution_bonus: number;
    intelligence_bonus: number;
    wisdom_bonus: number;
    charisma_bonus: number;
}

export interface GameCharacters {
    name: string;
    classe: string;
    race: string;
    level: number;
    characteristics: Characteristics;
    buffs: Buff[];
    ac: number;
    hp: number;
    bab: number;
    initiative: number;
    weapon_dice: string;
    size: string;
    st: SavingThrows;
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

    selection = '';

    allBuffs: string[] = ['Benedizione', 'Armatura Magica', '+5 a caso', 'Favore divino',
        '-1 ai TS "Scosso"'];

    buffs: Buff[] = [];

    db = {};

    actualGameCharacter = null;

    allCharacters: GameCharacters[] = [];

    allTypes: string[] = [ 'Nessuno', 'Divino', 'Fortuna', 'Magico' ];

    actualDamages = 0;
    actualHits = '';

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {
        /*
        this.buffs.push({
            ac: 0,
            ac_list: false,
            combat_list: false,
            damage: 0,
            description: null,
            extra_attack: 0,
            fortitude: 1,
            hit: 0,
            name: 'Benedizione',
            reflex: 1,
            st_list: true,
            will: 1,
            type: 'Nessuno',
            selected: false,
        });

        this.db['Magnus'] = {
            name: 'Magnus',
            classe: 'Chierico',
            race: 'Nano',
            level: 11,
            characteristics: {
                strength: 16,
                dexterity: 13,
                constitution: 15,
                intelligence: 10,
                wisdom: 24,
                charisma: 8,
            },
            buffs: [],
            ac: 33,
            hp: 92,
            bab: 8,
            initiative: 1,
            weapon_dice: '1d8',
            size: 'Media',
        };

        this.storage.set('db', this.db);
        */
        // tslint:disable-next-line:variable-name
        this.storage.get('db').then((db) => {

            // Per inizializzare
            if (db === null) {
                this.storage.set('db', {});
            }
            this.db = db;
            // console.log(this.db);
            // Primo personaggio attuale, prima chiave del dizionario esterno
            this.actualGameCharacter = Object.keys(this.db)[0];
            // console.log(this.actualGameCharacter);
            this.buffs = this.db[this.actualGameCharacter].buffs;
            // console.log(this.buffs);
            // tslint:disable-next-line:forin
            for (const dbKey in this.db) {
                // if to be removed when erasing db for alpha release
                // tslint:disable-next-line:triple-equals
                if (dbKey != 'null') {
                    this.allCharacters.push(db[dbKey]);
                }
            }
            // console.log(this.allCharacters);
            // console.log(this.db[this.actualGameCharacter]);
            this.actualDamages = this.fromScoreToModifier(this.db[this.actualGameCharacter].characteristics.strength);
            var actualHitsCalc = this.fromScoreToModifier(this.db[this.actualGameCharacter].characteristics.strength)
                + this.db[this.actualGameCharacter].bab;
            this.actualHits = String(actualHitsCalc);

            // routin per attacchi secondari
            if (this.db[this.actualGameCharacter].bab >= 6) {
                this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
                if (this.db[this.actualGameCharacter].bab >= 11) {
                    this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
                    if (this.db[this.actualGameCharacter].bab >= 16) {
                        this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
                    }
                }
            }
        });

    }

    ngOnInit(): void {
        this.storage.get('db').then((db) => {

            // Per inizializzare
            if (db === null) {
                this.storage.set('db', {});
            }
            this.db = db;
            // console.log(this.db);
            // Primo personaggio attuale, prima chiave del dizionario esterno
            this.actualGameCharacter = Object.keys(this.db)[0];
            // console.log(this.actualGameCharacter);
            this.buffs = this.db[this.actualGameCharacter].buffs;
            // console.log(this.buffs);
        });
    }

    onSelChange(sel: string) {
        this.selection = sel;
    }

    editBuff($event: MouseEvent, buff: Buff) {
        this.router.navigate(['/edit-buff'], { state: { buff,
                actualGameCharacter: this.actualGameCharacter, buffs: this.buffs, types: this.allTypes } } );
    }

    addBuffPage() {
        this.router.navigate(['add-buff'], { state: { actualGameCharacter: this.actualGameCharacter,
                buffs: this.buffs, types: this.allTypes } });
    }

    addCharacter() {
        this.router.navigate(['add-character'], { state: { actualGameCharacter: this.actualGameCharacter,
                buffs: this.buffs, types: this.allTypes } });
    }

    editCharacter($event: MouseEvent, char: GameCharacters) {
        this.router.navigate(['edit-character'], { state: { char,
            actualGameCharacter: this.actualGameCharacter, buffs: this.buffs, types: this.allTypes } });
    }

    fromScoreToModifier(score: number) {
        return Math.floor((score - 10) / 2);
    }

    onBuffSelectionChange(selectedCombatBuffs: Buff[]) {

        let actualDamagesCalc = this.fromScoreToModifier(this.db[this.actualGameCharacter].characteristics.strength);
        let actualHitsCalc = this.fromScoreToModifier(this.db[this.actualGameCharacter].characteristics.strength)
            + this.db[this.actualGameCharacter].bab;

        for (let buff of selectedCombatBuffs) {
            actualDamagesCalc += buff.damage;
            actualDamagesCalc += Math.floor(buff.strength_bonus / 2);
            actualHitsCalc += buff.hit;
            actualHitsCalc += Math.floor(buff.strength_bonus / 2);
        }

        this.actualDamages = actualDamagesCalc;
        this.actualHits = String(actualHitsCalc);

        // routin per attacchi secondari
        if (this.db[this.actualGameCharacter].bab >= 6) {
            this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
            if (this.db[this.actualGameCharacter].bab >= 11) {
                this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
                if (this.db[this.actualGameCharacter].bab >= 16) {
                    this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
                }
            }
        }
        this.writeSelectedDb();
    }

    getWeaponDice() {
        try { return this.db[this.actualGameCharacter]['weapon_dice']; } catch (e) {
            return '';
        }
    }

    writeSelectedDb() {
        this.db[this.actualGameCharacter].buffs = this.buffs;
        this.storage.set('db', this.db);
    }
}
