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
  public activeBuffs: Buff[];

  constructor(public navCtrl: NavController, public storage: Storage, public router: Router) {

     this.actualGameCharacter = this.router.getCurrentNavigation().extras.state.actualGameCharacter;
     this.activeBuffs = this.router.getCurrentNavigation().extras.state.activeBuffs;
     console.log(this.activeBuffs);

  }

  ngOnInit() {
  }

}
