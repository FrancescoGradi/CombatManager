import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBuffPage } from './edit-buff.page';

const routes: Routes = [
  {
    path: '',
    component: EditBuffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBuffPageRoutingModule {}
