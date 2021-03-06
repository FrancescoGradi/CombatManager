import { Component, OnInit } from '@angular/core';
import {Buff} from '../home/home.page';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DoubleCheckBuffDialogComponent} from '../double-check-buff-dialog/double-check-buff-dialog.component';

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
        isBonus: false,
        size: 'No',
        multiplier: 1,
    };

    public types: string[];
    public selected: string;
    public actualGameCharacter: string;
    public buffs: Buff[];
    sizes: string[] = ['No', 'Piccolissima', 'Minuta', 'Minuscola', 'Piccola', 'Media', 'Grande', 'Enorme', 'Gigantesca', 'Colossale'];

    constructor(public navCtrl: NavController, public storage: Storage, public router: Router, public dialog: MatDialog) {
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

        if (this.buffToEdit.ac === null) {
            this.buffToEdit.ac = 0;
        }

        if (this.buffToEdit.damage === null) {
            this.buffToEdit.damage = 0;
        }

        if (this.buffToEdit.extra_attack === null) {
            this.buffToEdit.extra_attack = 0;
        }

        if (this.buffToEdit.fortitude === null) {
            this.buffToEdit.fortitude = 0;
        }

        if (this.buffToEdit.hit === null) {
            this.buffToEdit.hit = 0;
        }

        if (this.buffToEdit.reflex === null) {
            this.buffToEdit.reflex = 0;
        }

        if (this.buffToEdit.will === null) {
            this.buffToEdit.will = 0;
        }

        if (this.buffToEdit.strength_bonus === null) {
            this.buffToEdit.strength_bonus = 0;
        }

        if (this.buffToEdit.dexterity_bonus === null) {
            this.buffToEdit.dexterity_bonus = 0;
        }

        if (this.buffToEdit.constitution_bonus === null) {
            this.buffToEdit.constitution_bonus = 0;
        }

        if (this.buffToEdit.intelligence_bonus === null) {
            this.buffToEdit.intelligence_bonus = 0;
        }

        if (this.buffToEdit.wisdom_bonus === null) {
            this.buffToEdit.wisdom_bonus = 0;
        }

        if (this.buffToEdit.charisma_bonus === null) {
            this.buffToEdit.charisma_bonus = 0;
        }

        if (this.buffToEdit.multiplier === null) {
            this.buffToEdit.multiplier = 1;
        }

        if (this.buffToEdit.description === '' || this.buffToEdit.description === ' ') {
            this.buffToEdit.description = null;
        }

        this.buffToEdit.combat_list = false;
        this.buffToEdit.ac_list = false;
        this.buffToEdit.st_list = false;
        this.buffToEdit.isBonus = false;

        if (this.buffToEdit.hit != 0 || this.buffToEdit.damage != 0 || this.buffToEdit.strength_bonus != 0 || this.buffToEdit.size != 'No'
            || this.buffToEdit.extra_attack != 0 || this.buffToEdit.description != null || this.buffToEdit.multiplier != 1) {
            this.buffToEdit.combat_list = true;
        }

        if (this.buffToEdit.ac != 0 || this.buffToEdit.dexterity_bonus != 0 || this.buffToEdit.description != null
            || this.buffToEdit.size != 'No') {
            this.buffToEdit.ac_list = true;
        }

        if (this.buffToEdit.reflex != 0 || this.buffToEdit.fortitude != 0 || this.buffToEdit.will != 0
            || this.buffToEdit.dexterity_bonus != 0 || this.buffToEdit.wisdom_bonus != 0
            || this.buffToEdit.constitution_bonus != 0 || this.buffToEdit.description != null) {
            this.buffToEdit.st_list = true;
        }

        if (this.buffToEdit.hit > 0 || this.buffToEdit.damage > 0 || this.buffToEdit.ac > 0
            || this.buffToEdit.fortitude > 0 || this.buffToEdit.reflex > 0 || this.buffToEdit.will > 0
            || this.buffToEdit.strength_bonus > 0 || this.buffToEdit.dexterity_bonus > 0
            || this.buffToEdit.constitution_bonus > 0 || this.buffToEdit.intelligence_bonus > 0
            || this.buffToEdit.wisdom_bonus > 0 || this.buffToEdit.charisma_bonus > 0
            || this.buffToEdit.extra_attack > 0 || this.buffToEdit.multiplier > 1
            || (this.buffToEdit.description != null && this.buffToEdit.description.includes('+'))) {
            this.buffToEdit.isBonus = true;
        } else {
            this.buffToEdit.isBonus = false;
        }

        if (this.buffToEdit.combat_list === false && this.buffToEdit.ac_list === false && this.buffToEdit.st_list === false) {
            this.buffToEdit.combat_list = true;
            this.buffToEdit.ac_list = true;
            this.buffToEdit.st_list = true;
        }

        this.router.navigate(['home']);
    }

    openDoubleCheckDialog($event) {
        let dialogRef = this.dialog.open(DoubleCheckBuffDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            const res = result;
            if (res === 'true') {
                this.delBuff($event);
            }
        });
    }

}
