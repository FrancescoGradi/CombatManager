import { Component, OnInit } from '@angular/core';
import { Buff } from '../home/home.page';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

// @ts-ignore
@Component({
    selector: 'app-add-buff',
    templateUrl: './add-buff.page.html',
    styleUrls: ['./add-buff.page.scss'],
})
export class AddBuffPage implements OnInit {

    constructor(public navCtrl: NavController, public storage: Storage) { }

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

        this.storage.get('buff_list').then((buff_list) => {
            buff_list.push(this.buff);
            this.storage.set('buff_list', buff_list);
        });

    }
}
