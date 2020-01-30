import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterStatsPage } from './character-stats.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterStatsPageRoutingModule {}
