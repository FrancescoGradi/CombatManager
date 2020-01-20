import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCharacterPage } from './add-character.page';

const routes: Routes = [
  {
    path: '',
    component: AddCharacterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCharacterPageRoutingModule {}
