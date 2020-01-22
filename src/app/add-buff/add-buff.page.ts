import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Buff } from '../home/home.page';
import { HomePage } from '../home/home.page';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

// @ts-ignore
@Component({
    selector: 'app-add-buff',
    templateUrl: './add-buff.page.html',
    styleUrls: ['./add-buff.page.scss'],
})
export class AddBuffPage extends HomePage implements OnInit {

    constructor(public navCtrl: NavController, public storage: Storage) {
        super(navCtrl, storage);
        this.actualGameCharacter = super.actualGameCharacter;
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
    };

    types: string[] = [ 'Nessuno', 'Divino', 'Fortuna', 'Magico' ];

    ngOnInit() {
    }

    saveBuff($event: MouseEvent) {

        this.storage.get('db').then((db) => {

            // TO-DO: scegliere le liste di appartenenza in base al buff

            db[this.actualGameCharacter].buffs.push(this.buff);
            this.storage.set('db', db);
        });

    }
}
