import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCharacterPageRoutingModule } from './edit-character-routing.module';

import { EditCharacterPage } from './edit-character.page';
import {MatFormFieldModule, MatIconModule, MatOptionModule, MatSelectModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditCharacterPageRoutingModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule
    ],
  declarations: [EditCharacterPage]
})
export class EditCharacterPageModule {}
