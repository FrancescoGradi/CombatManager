import { Component, OnInit } from '@angular/core';
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
export class AddBuffPage extends HomePage implements OnInit {
    public types: string[];

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {
        super(navCtrl, storage, router);
        this.actualGameCharacter = super.actualGameCharacter;
        this.types = super.getTypes();
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

    ngOnInit() {
    }

    saveBuff($event: MouseEvent) {

        this.storage.get('db').then((db) => {

            // TO-DO: scegliere le liste di appartenenza in base al buff

            db[this.actualGameCharacter].buffs.push(this.buff);
            this.storage.set('db', db);

            console.log(this.buff);

            super.pushBuff(this.buff);

            this.router.navigate(['']);

        });

    }
}
