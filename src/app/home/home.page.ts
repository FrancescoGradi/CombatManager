import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router, NavigationEnd} from '@angular/router';
import {MatDrawer} from '@angular/material';

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
    isBonus: boolean;
    size: string;
    multiplier: number;
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
    typeAttack: string;
    type_weapon: string;
    st: SavingThrows;
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements AfterViewInit {

    // @ts-ignore
    @ViewChild(MatTabGroup) group;
    @ViewChildren(MatTab) tabs;
    tab_num = 0;
    selectedTab = 0;
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

    number_tabs;
    ngAfterViewInit(){
        this.tab_num = this.tabs.length;
    }
    swipe(eType){
        if(eType === this.SWIPE_ACTION.RIGHT && this.selectedTab > 0){
            this.selectedTab--;
        }
        else if(eType === this.SWIPE_ACTION.LEFT && this.selectedTab < this.tab_num){
            this.selectedTab++;
        }
    }

    selection = '';

    buffs: Buff[] = [];

    db = {};

    actualGameCharacter = null;

    allCharacters: GameCharacters[] = [];

    classes: string[] = ['Guerriero', 'Mago', 'Ranger', 'Bardo', 'Stregone', 'Ladro', 'Barbaro', 'Paladino', 'Chierico', 'Druido', 'Monaco'];
    allTypes: string[] = [ 'Nessuno', 'Divino', 'Fortuna', 'Magico' ];

    actualDamages = 0;
    actualHits = null;
    actualArmor = 0;
    actualFortitude = 0;
    actualReflex = 0;
    actualWill = 0;
    actualWeaponDice: string;
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
            this.selectedCombatBuffs = [];
            if (this.actualGameCharacter != null) {
                this.buffs = this.actualGameCharacter.buffs;
                this.selection = this.actualGameCharacter.name;
                for (const buff of this.buffs) {
                    if (buff.selected === true) {
                        this.selectedCombatBuffs.push(buff);
                    }
                }
            } else {
                this.buffs = [];
            }
            // console.log(this.buffs);
            // tslint:disable-next-line:forin

            // console.log(this.allCharacters);
            // console.log(this.db[this.actualGameCharacter]);
            if (this.actualGameCharacter != null) {
                this.onBuffSelectionChange(this.selectedCombatBuffs);
            }

            this.router.events.subscribe((ev) => {
                if (ev instanceof NavigationEnd) {
                    this.onBuffSelectionChange(this.selectedCombatBuffs);
                }
            });

        });

    }

    editRoutine(drawer: MatDrawer, $event: MouseEvent, c: GameCharacters) {
        this.editCharacter($event, c);
        drawer.toggle();
    }

    onSelChange(c: GameCharacters) {
        if (c != null) {
            this.selection = c.name;
            this.buffs = c.buffs;
            this.actualGameCharacter = c;

            this.selectedCombatBuffs = [];
            for (const buff of this.buffs) {
                if (buff.selected === true) {
                    this.selectedCombatBuffs.push(buff);
                }
            }
            this.onBuffSelectionChange(this.selectedCombatBuffs);
        }
    }

    editBuff($event: MouseEvent, buff: Buff) {
        this.router.navigate(['/edit-buff'], { state: { buff,
                actualGameCharacter: this.actualGameCharacter.name, buffs: this.buffs, types: this.allTypes,
                allCharacters: this.allCharacters} } );
    }

    addBuffPage() {
        this.router.navigate(['add-buff'], { state: { actualGameCharacter: this.actualGameCharacter,
                buffs: this.buffs, types: this.allTypes, allCharacters: this.allCharacters } });
    }

    addCharacter() {
        this.router.navigate(['add-character'], { state: { allCharacters: this.allCharacters,
                actualGameCharacter: this.actualGameCharacter, selection: this.selection} });
    }

    editCharacter($event: MouseEvent, char: GameCharacters) {
        this.router.navigate(['edit-character'], { state: { char,
            actualGameCharacter: this.actualGameCharacter, allCharacters: this.allCharacters, buffs: this.buffs} });
    }

    characterStats($event: MouseEvent) {
        this.router.navigate(['character-stats'], { state: {
            actualGameCharacter: this.actualGameCharacter, activeCombatBuffs: this.selectedCombatBuffs,
            activeACBuffs: this.selectedAcBuffs, activeSTBuffs: this.selectedStBuffs }});
    }

    fromScoreToModifier(score: number) {
        return Math.floor((score - 10) / 2);
    }

    onBuffSelectionChange(selectedBuffs: Buff[]) {

        for (const buff of this.buffs) {
            buff.selected = false;
            // @ts-ignore
            if (this.selectedCombatBuffs != []) {
                for (const sel of this.selectedCombatBuffs) {
                    if (buff == sel) {
                        buff.selected = true;
                        sel.selected = true;
                    }
                }
            }
        }

        let actualHitsCalc = 0;
        let actualDamagesCalc = 0;
        if (this.actualGameCharacter.typeAttack === 'distanza') {
            actualHitsCalc = Number(this.fromScoreToModifier(this.actualGameCharacter.characteristics.dexterity))
                + Number(this.actualGameCharacter.bab);
        } else {
            actualHitsCalc = Number(this.fromScoreToModifier(this.actualGameCharacter.characteristics.strength))
                + Number(this.actualGameCharacter.bab);

            if (this.actualGameCharacter.type_weapon === 'a due mani') {
                actualDamagesCalc = Math.floor((this.fromScoreToModifier(this.actualGameCharacter.characteristics.strength) * 1.5));
            } else {
                actualDamagesCalc = this.fromScoreToModifier(this.actualGameCharacter.characteristics.strength);
            }
        }

        let actualArmorCalc = Number(this.actualGameCharacter.ac);

        let actualFortitudeCalc = Number(this.actualGameCharacter.st.fortitude)
            + Number(this.fromScoreToModifier(this.actualGameCharacter.characteristics.constitution));
        let actualReflexCalc = Number(this.actualGameCharacter.st.reflex)
            + Number(this.fromScoreToModifier(this.actualGameCharacter.characteristics.dexterity));
        let actualWillCalc = Number(this.actualGameCharacter.st.will)
            + Number(this.fromScoreToModifier(this.actualGameCharacter.characteristics.wisdom));

        let extra_attacks = 0;
        let actualMultiplier = 1;
        let actualSize = this.actualGameCharacter.size;


        if (this.selectedCombatBuffs !== []) {
            for (const buff of this.selectedCombatBuffs) {
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
                if (buff.size != 'No' && buff.size != actualSize) {
                    actualSize = buff.size;
                }
                if (buff.multiplier > actualMultiplier) {
                    actualMultiplier = buff.multiplier;
                }
            }
        }

        actualHitsCalc += this.getSizeModifier(actualSize);
        actualArmorCalc += this.getSizeModifier(actualSize);
        let actualWeaponDiceCalc = this.actualGameCharacter.weapon_dice;
        actualWeaponDiceCalc = this.getWeaponSizeDice(actualWeaponDiceCalc, actualSize);

        actualDamagesCalc *= actualMultiplier;
        actualWeaponDiceCalc = this.getWeaponDiceAfterMultiplier(actualWeaponDiceCalc, actualMultiplier);

        this.actualWeaponDice = actualWeaponDiceCalc;
        this.actualDamages = actualDamagesCalc;
        this.actualHits = String(actualHitsCalc);
        this.actualArmor = actualArmorCalc;
        this.actualFortitude = actualFortitudeCalc;
        this.actualReflex = actualReflexCalc;
        this.actualWill = actualWillCalc;

        let extra_attacksTmpString = '';
        for (let i = 0; i < extra_attacks; i++) {
            extra_attacksTmpString = extra_attacksTmpString.concat('/', this.actualHits);
        }
        this.actualHits = this.actualHits.concat(extra_attacksTmpString);

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

    getSizeModifier(size: string) {
        if (size === 'Colossale') { return -8 }
        else if (size === 'Gigantesca') { return -4 }
        else if (size === 'Enorme') { return -2 }
        else if (size === 'Grande') { return -1 }
        else if (size === 'Piccola') { return +1 }
        else if (size === 'Minuscola') { return +2 }
        else if (size === 'Minuta') { return +4 }
        else if (size === 'Piccolissima') { return +8 }
        else return 0;
    }

    private getWeaponSizeDice(actualWeaponDiceCalc: string, actualSize: string) {

        if (actualSize === 'Media') { return actualWeaponDiceCalc }

        if (actualSize === 'Grande' || actualSize === 'Enorme' || actualSize === 'Gigantesca' || actualSize === 'Colossale') {
            if (actualWeaponDiceCalc === '1d2') { return '1d3' }
            else if (actualWeaponDiceCalc ==='1d3') { return '1d4' }
            else if (actualWeaponDiceCalc ==='1d4') { return '1d6' }
            else if (actualWeaponDiceCalc ==='1d6') { return '1d8' }
            else if (actualWeaponDiceCalc ==='1d8') { return '2d6' }
            else if (actualWeaponDiceCalc ==='1d10') { return '1d6' }
            else if (actualWeaponDiceCalc ==='1d12') { return '2d6' }
            else if (actualWeaponDiceCalc ==='2d4') { return '2d6' }
            else if (actualWeaponDiceCalc ==='2d6') { return '3d6' }
            else if (actualWeaponDiceCalc ==='2d8') { return '3d8' }
            else if (actualWeaponDiceCalc ==='2d10') { return '4d8' }
        }

        if (actualSize === 'Piccolissima' || actualSize === 'Minuta' || actualSize === 'Minuscola' || actualSize === 'Piccola') {
            if (actualWeaponDiceCalc ==='1d2') { return '' }
            else if (actualWeaponDiceCalc ==='1d3') { return '1' }
            else if (actualWeaponDiceCalc ==='1d4') { return '1d2' }
            else if (actualWeaponDiceCalc ==='1d6') { return '1d3' }
            else if (actualWeaponDiceCalc ==='1d8') { return '1d4' }
            else if (actualWeaponDiceCalc ==='1d10') { return '1d6' }
            else if (actualWeaponDiceCalc ==='1d12') { return '1d8' }
            else if (actualWeaponDiceCalc ==='2d4') { return '1d4' }
            else if (actualWeaponDiceCalc ==='2d6') { return '1d8' }
            else if (actualWeaponDiceCalc ==='2d8') { return '1d10' }
            else if (actualWeaponDiceCalc ==='2d10') { return '2d6' }
        }

        return '';
    }

    getWeaponDiceAfterMultiplier(actualWeaponDice: string, multiplier: number) {
        let n_dice = '';
        if (actualWeaponDice != '') {
            let i = 0;
            while (actualWeaponDice.charAt(i) != 'd' && i < 20) {
                n_dice = n_dice.concat(actualWeaponDice.charAt(i));
                i += 1;
            }
            let n_dice_mul = Number(n_dice) * multiplier;
            n_dice = String(n_dice_mul);
            for ( ; i < actualWeaponDice.length; i++) {
                n_dice = n_dice.concat(actualWeaponDice.charAt(i))
            }
        }
        return n_dice;
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
            this.actualGameCharacter.buffs = this.buffs;
            for (let i = 0; i < this.allCharacters.length; i++) {
                if (this.allCharacters[i] === this.actualGameCharacter) {
                    this.allCharacters[i].buffs = this.buffs;
                }
            }

            db[this.actualGameCharacter.name].buffs = this.buffs;
            this.db = db;
            this.storage.set('db', this.db);
        });
    }
}
