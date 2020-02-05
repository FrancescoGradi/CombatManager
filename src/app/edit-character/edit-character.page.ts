import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Buff, GameCharacters} from '../home/home.page';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {ClassDialogComponent} from '../class-dialog/class-dialog.component';
import {DoubleCheckDialogComponent} from '../double-check-dialog/double-check-dialog.component';
import {MatDialog} from '@angular/material';
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.page.html',
  styleUrls: ['./edit-character.page.scss'],
})
export class EditCharacterPage implements AfterViewInit {

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

    charToEdit: GameCharacters;
    allChar: GameCharacters[];
    classes: string[] = ['Guerriero', 'Mago', 'Ranger', 'Bardo', 'Stregone', 'Ladro', 'Barbaro', 'Paladino', 'Chierico'];
    sizes: string[] = ['Piccolissima', 'Minuta', 'Minuscola', 'Piccola', 'Media', 'Grande', 'Enorme', 'Gigantesca', 'Colossale'];
    levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    attackTypes: string[] = ['mischia', 'distanza'];
    weaponTypes: string[] = ['a una mano', 'a due mani'];
    selected = this.classes[0];

    private buffs: Buff[];
    private actualGameCharacter: GameCharacters;

    constructor(public dialog: MatDialog, public navCtrl: NavController, public storage: Storage, public router: Router) {
        this.charToEdit = this.router.getCurrentNavigation().extras.state.char;
        this.allChar = this.router.getCurrentNavigation().extras.state.allCharacters;
        this.actualGameCharacter = this.router.getCurrentNavigation().extras.state.actualGameCharacter;
        this.buffs = this.router.getCurrentNavigation().extras.state.buffs;
    }

    editCharacter() {

        this.storage.get('db').then((db) => {

            db[this.charToEdit.name] = this.charToEdit;
            this.storage.set('db', db);

            this.actualGameCharacter = this.charToEdit;

            this.router.navigate(['home']);
        });

    }

    openDoubleCheckDialog() {
        let dialogRef = this.dialog.open(DoubleCheckDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            const res = result;
            if (res === 'true') {
                this.deleteCharacter();
            }
        });
    }

    deleteCharacter() {

        const toRemove = this.allChar.indexOf(this.charToEdit);

        if (toRemove > -1) {
            this.allChar.splice(toRemove, 1);
            this.storage.get('db').then((db) => {

                delete db[this.charToEdit.name];
                this.storage.set('db', db);

                if (this.allChar.length === 0) {
                    this.router.navigate(['add-character'], {state: {allCharacters: this.allChar}});
                } else {
                    this.router.navigate(['home']);
                }
            });
        }
    }
}
