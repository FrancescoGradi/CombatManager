import { Component, OnInit } from '@angular/core';
import {Buff} from "../home/home.page";
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-buff',
  templateUrl: './edit-buff.page.html',
  styleUrls: ['./edit-buff.page.scss'],
})
export class EditBuffPage implements OnInit {

    buffToEdit: { [p: string]: any } = {
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
        strength_bonus: 0,
        dexterity_bonus: 0,
        constitution_bonus: 0,
        intelligence_bonus: 0,
        wisdom_bonus: 0,
        charisma_bonus: 0,
    };

    public types: string[];
    public selected: string;
    public actualGameCharacter: string;
    public buffs: Buff[];

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {
        this.actualGameCharacter = this.router.getCurrentNavigation().extras.state.actualGameCharacter;
        this.buffs = this.router.getCurrentNavigation().extras.state.buffs;
        this.buffToEdit = this.router.getCurrentNavigation().extras.state.buff;
        this.types = this.router.getCurrentNavigation().extras.state.types;
        this.selected = this.types[0];
    }

    ngOnInit() {
    }

    delBuff($event: MouseEvent) {

        let indexToRemove = this.buffs.indexOf(<Buff>this.buffToEdit);

        if (indexToRemove > -1) {
            this.buffs.splice(indexToRemove, 1);
            this.storage.get('db').then((db) => {

                db[this.actualGameCharacter].buffs = this.buffs;
                this.storage.set('db', db);
            });
        }
        this.router.navigate(['home']);
    }

    saveBuff($event: MouseEvent) {

        this.buffToEdit.combat_list = false;
        this.buffToEdit.ac_list = false;
        this.buffToEdit.st_list = false;

        if (this.buffToEdit.hit != 0 || this.buffToEdit.damage != 0 || this.buffToEdit.strength_bonus != 0
            || this.buffToEdit.extra_attack != 0 || this.buffToEdit.description != null
            || this.buffToEdit.description != '') {
            this.buffToEdit.combat_list = true;
        }

        if (this.buffToEdit.ac != 0 || this.buffToEdit.dexterity_bonus != 0 || this.buffToEdit.description != null
            || this.buffToEdit.description != '') {
            this.buffToEdit.ac_list = true;
        }

        if (this.buffToEdit.reflex != 0 || this.buffToEdit.fortitude != 0 || this.buffToEdit.will != 0
            || this.buffToEdit.dexterity_bonus != 0 || this.buffToEdit.wisdom_bonus != 0
            || this.buffToEdit.constitution_bonus != 0 || this.buffToEdit.description != null
            || this.buffToEdit.description != '') {
            this.buffToEdit.st_list = true;
        }

        this.router.navigate(['home']);
    }
}
