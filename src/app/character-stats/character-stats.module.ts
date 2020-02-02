import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterStatsPageRoutingModule } from './character-stats-routing.module';

import { CharacterStatsPage } from './character-stats.page';
import {
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule, MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CharacterStatsPageRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatSlideToggleModule
    ],
  declarations: [CharacterStatsPage]
})
export class CharacterStatsPageModule {}
