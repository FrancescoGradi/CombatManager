import { Component, OnInit } from '@angular/core';
import {Buff, GameCharacters} from '../home/home.page';
import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-character-stats',
  templateUrl: './character-stats.page.html',
  styleUrls: ['./character-stats.page.scss'],
})
export class CharacterStatsPage implements OnInit {

  public actualGameCharacter: GameCharacters;
  public activeCombatBuffs: Buff[];
  public title: string;
  allBuffs: boolean;

  constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {

     this.actualGameCharacter = this.router.getCurrentNavigation().extras.state.actualGameCharacter;
     this.activeCombatBuffs = this.router.getCurrentNavigation().extras.state.activeCombatBuffs;
     this.allBuffs = true;
     this.title = 'Tutti i Buff';

  }

  ngOnInit() {
  }

  onToggleChange($event) {
      this.allBuffs = !this.allBuffs;
      if (this.title === 'Tutti i Buff') {
          this.title = 'Buff Attivi';
      } else {
          this.title = 'Tutti i Buff';
      }
  }

}
