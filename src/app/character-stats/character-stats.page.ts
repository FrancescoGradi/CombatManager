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
  public activeACBuffs: Buff[];
  public activeSTBuffs: Buff[];
  allBuffs: boolean;

  constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {

     this.actualGameCharacter = this.router.getCurrentNavigation().extras.state.actualGameCharacter;
     this.activeCombatBuffs = this.router.getCurrentNavigation().extras.state.activeCombatBuffs;
     this.activeACBuffs = this.router.getCurrentNavigation().extras.state.activeACBuffs;
     this.activeSTBuffs = this.router.getCurrentNavigation().extras.state.activeSTBuffs;
     this.allBuffs = false;

  }

  ngOnInit() {
  }

  onToggleChange($event) {
      this.allBuffs = !this.allBuffs;
  }

}
