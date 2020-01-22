import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.page.html',
  styleUrls: ['./edit-character.page.scss'],
})
export class EditCharacterPage implements OnInit {

  constructor() { }

  classes: string[] = ['Guerriero', 'Mago', 'Ranger', 'Bardo'];
  selected = this.classes[0];

  ngOnInit() {
  }

}
