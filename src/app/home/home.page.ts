import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    selection = '';

    allBuffs: string[] = ['Benedizione', 'Armatura Magica', '+5 a caso', 'Favore divino',
        '-1 ai TS "Scosso"'];


    onSelChange(sel: string) {
        this.selection = sel;
    }
}
