import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-buff',
  templateUrl: './add-buff.page.html',
  styleUrls: ['./add-buff.page.scss'],
})
export class AddBuffPage implements OnInit {

  constructor() { }

  types: string[] = [ 'Nessuno', 'Divino', 'Fortuna', 'Magico' ];
  selected = this.types[0];

  ngOnInit() {
  }

}
