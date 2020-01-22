import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCharacterPage } from './edit-character.page';

const routes: Routes = [
  {
    path: '',
    component: EditCharacterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCharacterPageRoutingModule {}
