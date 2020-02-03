import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCharacterPageRoutingModule } from './edit-character-routing.module';

import { EditCharacterPage } from './edit-character.page';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {MatRadioModule} from "@angular/material/radio";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditCharacterPageRoutingModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        MatTabsModule,
        MatToolbarModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatSidenavModule
    ],
  declarations: [EditCharacterPage]
})
export class EditCharacterPageModule {}
