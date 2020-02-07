import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Buff } from '../home/home.page';
import { HomePage } from '../home/home.page';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

// @ts-ignore
@Component({
    selector: 'app-add-buff',
    templateUrl: './add-buff.page.html',
    styleUrls: ['./add-buff.page.scss'],
})
export class AddBuffPage implements OnInit {
    public types: string[];
    public actualGameCharacter: { [p: string]: any };
    private buffs: Buff[];
    sizes: string[] = ['No', 'Piccolissima', 'Minuta', 'Minuscola', 'Piccola', 'Media', 'Grande', 'Enorme', 'Gigantesca', 'Colossale'];

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {
        this.actualGameCharacter = this.router.getCurrentNavigation().extras.state.actualGameCharacter;
        this.buffs = this.router.getCurrentNavigation().extras.state.buffs;
        this.types = this.router.getCurrentNavigation().extras.state.types;
    }

    buff: Buff = {
        ac: 0,
        ac_list: false,
        combat_list: false,
        damage: 0,
        description: null,
        extra_attack: 0,
        fortitude: 0,
        hit: 0,
        name: null,
        reflex: 0,
        st_list: false,
        will: 0,
        type: 'Nessuno',
        selected: false,
        strength_bonus: 0,
        dexterity_bonus: 0,
        constitution_bonus: 0,
        intelligence_bonus: 0,
        wisdom_bonus: 0,
        charisma_bonus: 0,
        isBonus: false,
        size: 'No',
        multiplier: 1,
    };

    ngOnInit() {
    }

    saveBuff($event: MouseEvent) {

        this.storage.get('db').then((db) => {

            if (this.buff.hit != 0 || this.buff.damage != 0 || this.buff.strength_bonus != 0 || this.buff.size != 'No'
                || this.buff.extra_attack != 0 || this.buff.multiplier != 1 ||(this.buff.description != null && this.buff.description.includes('attacco'))
                || (this.buff.description != null && this.buff.description.includes('arma'))) {
                this.buff.combat_list = true;
            }

            if (this.buff.ac != 0 || this.buff.dexterity_bonus != 0 || this.buff.size != 'No'
                || (this.buff.description != null && this.buff.description.includes('armatura'))
                || (this.buff.description != null && this.buff.description.includes('difesa'))) {
                this.buff.ac_list = true;
            }

            if (this.buff.reflex != 0 || this.buff.fortitude != 0 || this.buff.will != 0
                || this.buff.dexterity_bonus != 0 || this.buff.wisdom_bonus != 0 || this.buff.constitution_bonus != 0
                || (this.buff.description != null && this.buff.description.includes('salvezza'))
                || (this.buff.description != null && this.buff.description.includes('movimento'))) {
                this.buff.st_list = true;
            }

            if (this.buff.hit > 0 || this.buff.damage > 0 || this.buff.ac > 0 || this.buff.fortitude > 0 || this.buff.reflex > 0
                || this.buff.will > 0 || this.buff.strength_bonus > 0 || this.buff.dexterity_bonus > 0 || this.buff.constitution_bonus > 0
                || this.buff.intelligence_bonus > 0 || this.buff.wisdom_bonus > 0 || this.buff.charisma_bonus > 0
                || this.buff.extra_attack > 0 || this.buff.multiplier > 1 || (this.buff.description != null && this.buff.description.includes('+'))) {
                this.buff.isBonus = true;
            } else {
                this.buff.isBonus = false;
            }

            if (this.buff.combat_list === false && this.buff.ac_list === false && this.buff.st_list === false) {
                this.router.navigate(['home']);
            } else {
                // @ts-ignore
                db[this.actualGameCharacter.name].buffs.push(this.buff);
                this.storage.set('db', db);

                // questo e' il riferimento dell'array in home, se lo modifica, essendo bindato, aggiorna in automatico la
                // lista
                this.buffs.push(this.buff);

                this.router.navigate(['home']);
            }
        });

    }
}
