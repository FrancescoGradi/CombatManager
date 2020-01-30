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
    bab: string;
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

    buffs: Buff[] = [];

    db = {};

    actualGameCharacter = null;

    allCharacters: GameCharacters[] = [];

    allTypes: string[] = [ 'Nessuno', 'Divino', 'Fortuna', 'Magico' ];

    actualDamages = 0;
    actualHits = null;
    actualArmor = 0;
    actualFortitude = 0;
    actualReflex = 0;
    actualWill = 0;
    selectedCombatBuffs: any;
    selectedAcBuffs: any;
    selectedStBuffs: any;
    selected: any;

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {

        // this.storage.set('db', this.db);

        // tslint:disable-next-line:variable-name
        this.storage.get('db').then((db) => {

            // Per inizializzare
            if (db === null) {
                this.storage.set('db', {});
            }
            this.db = db;

            for (const dbKey in this.db) {
                // if to be removed when erasing db for alpha release
                // tslint:disable-next-line:triple-equals
                if (dbKey != 'null') {
                    this.allCharacters.push(db[dbKey]);
                }
            }

            if (this.allCharacters.length == 0) {
                this.addCharacter();
            }
            // console.log(this.db);
            // Primo personaggio attuale, prima chiave del dizionario esterno
            this.actualGameCharacter = this.db[Object.keys(this.db)[0]];
            // console.log(this.actualGameCharacter);
            if (this.actualGameCharacter != null) {
                this.buffs = this.actualGameCharacter.buffs;
                this.selection = this.actualGameCharacter.name;
            } else {
                this.buffs = [];
            }
            // console.log(this.buffs);
            // tslint:disable-next-line:forin

            // console.log(this.allCharacters);
            // console.log(this.db[this.actualGameCharacter]);
            if (this.actualGameCharacter != null) {
                this.computeDamage();
            }
            // console.log(this.allCharacters.length);
            // Tried to auto-redirect to character creation on first open
            // tslint:disable-next-line:triple-equals
        });

    }

    ngOnInit(): void { }

    onSelChange(c: GameCharacters) {
        if (c != null) {
            this.selection = c.name;
            this.buffs = c.buffs;
            this.actualGameCharacter = c;
            this.computeDamage();
        }
    }

    editBuff($event: MouseEvent, buff: Buff) {
        this.router.navigate(['/edit-buff'], { state: { buff,
                actualGameCharacter: this.actualGameCharacter, buffs: this.buffs, types: this.allTypes,
                allCharacters: this.allCharacters} } );
    }

    addBuffPage() {
        this.router.navigate(['add-buff'], { state: { actualGameCharacter: this.actualGameCharacter,
                buffs: this.buffs, types: this.allTypes, allCharacters: this.allCharacters } });
    }

    addCharacter() {
        this.router.navigate(['add-character'], { state: { allCharacters: this.allCharacters } });
    }

    editCharacter($event: MouseEvent, char: GameCharacters) {
        this.storage.get('db').then((db) => {
            delete db[char.name];
            this.storage.set('db', db);
            this.db = db;
            console.log(db);
        });
        this.router.navigate(['edit-character'], { state: { char,
            actualGameCharacter: this.actualGameCharacter, allCharacters: this.allCharacters } });
    }

    characterStats($event: MouseEvent) {
        this.router.navigate(['character-stats'], { state: {
            actualGameCharacter: this.actualGameCharacter }});
    }

    fromScoreToModifier(score: number) {
        return Math.floor((score - 10) / 2);
    }

    onBuffSelectionChange(selectedCombatBuffs: Buff[]) {

        let actualDamagesCalc = this.fromScoreToModifier(this.actualGameCharacter.characteristics.strength);
        let actualHitsCalc = this.fromScoreToModifier(this.actualGameCharacter.characteristics.strength)
            + this.actualGameCharacter.bab;

        let actualArmorCalc = 0;
        let actualFortitudeCalc = 0;
        let actualReflexCalc = 0;
        let actualWillCalc = 0;

        for (const buff of selectedCombatBuffs) {
            actualDamagesCalc += buff.damage;
            actualDamagesCalc += Math.floor(buff.strength_bonus / 2);
            actualHitsCalc += buff.hit;
            actualHitsCalc += Math.floor(buff.strength_bonus / 2);
            actualArmorCalc += Math.floor(buff.ac);
            actualFortitudeCalc += Math.floor(buff.fortitude);
            actualReflexCalc += Math.floor(buff.reflex);
            actualWillCalc += Math.floor(buff.will);
        }

        this.actualDamages = actualDamagesCalc;
        this.actualHits = String(actualHitsCalc);
        this.actualArmor = actualArmorCalc;
        this.actualFortitude = actualFortitudeCalc;
        this.actualReflex = actualReflexCalc;
        this.actualWill = actualWillCalc;

        console.log(actualHitsCalc);
        console.log(this.actualHits);

        // routine per attacchi secondari
        if (this.actualGameCharacter.bab >= 6) {
            this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
            if (this.actualGameCharacter.bab >= 11) {
                this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 10));
                if (this.actualGameCharacter.bab >= 16) {
                    this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 15));
                }
            }
        }
        this.writeSelectedDb();
    }

    getWeaponDice() {
        try { return this.actualGameCharacter.weapon_dice; } catch (e) {
            return '';
        }
    }

    getAC() {
        try { return this.actualGameCharacter.ac; } catch (e) {
            return 0;
        }
    }

    getFortitude() {
        try { return this.actualGameCharacter.st.fortitude; } catch (e) {
            return 0;
        }
    }

    getReflex() {
        try { return this.actualGameCharacter.st.reflex; } catch (e) {
            return 0;
        }
    }

    getWill() {
        try { return this.actualGameCharacter.st.will; } catch (e) {
            return 0;
        }
    }

    writeSelectedDb() {
        this.storage.get('db').then((db) => {
            db[this.actualGameCharacter.name].buffs = this.buffs;
            this.db = db;
            this.storage.set('db', this.db);
        });
    }

    computeDamage() {
        this.actualDamages = this.fromScoreToModifier(this.actualGameCharacter.characteristics.strength);
        const actualHitsCalc = this.fromScoreToModifier(this.actualGameCharacter.characteristics.strength)
            + this.actualGameCharacter.bab;
        this.actualHits = String(actualHitsCalc);

        console.log(actualHitsCalc);
        console.log(this.actualHits);

        // routine per attacchi secondari
        if (this.actualGameCharacter.bab >= 6) {
            this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 5));
            if (this.actualGameCharacter.bab >= 11) {
                this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 10));
                if (this.actualGameCharacter.bab >= 16) {
                    this.actualHits = this.actualHits.concat('/', String(actualHitsCalc - 15));
                }
            }
        }
    }

}
