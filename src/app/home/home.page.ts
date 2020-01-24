import {Component, HostBinding, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { EditBuffPage } from "../edit-buff/edit-buff.page";

import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from "@angular/router";

export interface Characteristics {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
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
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

    ngOnInit(): void {
        this.storage.get('db').then((db) => {

            // Per inizializzare
            if (db === null) {
                this.storage.set('db', {});
            }
            this.db = db;
            console.log(this.db);
            // Primo personaggio attuale, prima chiave del dizionario esterno
            this.actualGameCharacter = Object.keys(this.db)[0];
            console.log(this.actualGameCharacter);
            this.buffs = this.db[this.actualGameCharacter].buffs;
            console.log(this.buffs);
        });
    }

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {
        console.log(this.router.getCurrentNavigation().extras.state);
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
            console.log(this.db);
            // Primo personaggio attuale, prima chiave del dizionario esterno
            this.actualGameCharacter = Object.keys(this.db)[0];
            console.log(this.actualGameCharacter);
            this.buffs = this.db[this.actualGameCharacter].buffs;
            console.log(this.buffs);
        });

    }

    selection = '';

    allBuffs: string[] = ['Benedizione', 'Armatura Magica', '+5 a caso', 'Favore divino',
        '-1 ai TS "Scosso"'];

    buffs: Buff[] = [];

    db = {};

    actualGameCharacter = null;

    allTypes: string[] = [ 'Nessuno', 'Divino', 'Fortuna', 'Magico' ];

    public pushBuff(buff: Buff) {
        this.buffs.push(buff);
    }

    getTypes() { return this.allTypes; }

    getActualGameCharacter() { return this.actualGameCharacter; }

    onSelChange(sel: string) {
        this.selection = sel;
    }

    editBuff($event: MouseEvent, buff: Buff) {
        this.router.navigate(['/edit-buff'], { state: { buff: buff,
                actualGameCharacter: this.actualGameCharacter, buffs: this.buffs, types: this.allTypes } } );
    }

    addBuffPage() {
        this.router.navigate(['ab'], { state: { actualGameCharacter: this.actualGameCharacter,
                buffs: this.buffs, types: this.allTypes } });
    }

}

