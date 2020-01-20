import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBuffPage } from './add-buff.page';

const routes: Routes = [
  {
    path: '',
    component: AddBuffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBuffPageRoutingModule {}
