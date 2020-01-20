import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBuffPageRoutingModule } from './add-buff-routing.module';

import { AddBuffPage } from './add-buff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBuffPageRoutingModule
  ],
  declarations: [AddBuffPage]
})
export class AddBuffPageModule {}
