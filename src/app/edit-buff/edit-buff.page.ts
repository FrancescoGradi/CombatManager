import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-buff',
  templateUrl: './edit-buff.page.html',
  styleUrls: ['./edit-buff.page.scss'],
})
export class EditBuffPage implements OnInit {

    types: string[] = [ 'Nessuno', 'Divino', 'Fortuna', 'Magico' ];
    selected = this.types[0];

    constructor() { }

    ngOnInit() {
    }

}
