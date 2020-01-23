import { Component, OnInit } from '@angular/core';
import {Buff, HomePage} from "../home/home.page";
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-edit-buff',
  templateUrl: './edit-buff.page.html',
  styleUrls: ['./edit-buff.page.scss'],
})
export class EditBuffPage extends HomePage implements OnInit {

    buffToEdit: Buff = {
        ac: 0,
        ac_list: false,
        combat_list: false,
        damage: 0,
        description: null,
        extra_attack: 0,
        fortitude: 0,
        hit: 0,
        name: 'Prova',
        reflex: 0,
        st_list: false,
        will: 0,
        type: 'Nessuno',
        selected: false,
    };

    public types: string[];
    public selected: string;
    public actualGameCharacter: string;

    constructor(public navCtrl: NavController, public storage: Storage, private router: Router) {
        super(navCtrl, storage, router);
        this.actualGameCharacter = super.actualGameCharacter;
        this.types = super.getTypes();
        this.selected = this.types[0];

        console.log(this.router.getCurrentNavigation().extras.state);

        console.log(history.state);

    }

    ngOnInit() {
    }

}
