import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCharacterPageRoutingModule } from './add-character-routing.module';

import { AddCharacterPage } from './add-character.page';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule, MatSelectModule, MatStepperModule} from '@angular/material';
import {ClassDialogComponent} from '../class-dialog/class-dialog.component';
import {MatSelectModule, MatStepperModule} from '@angular/material';
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddCharacterPageRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatRadioModule,
        MatDialogModule,
    ],
  entryComponents: [ClassDialogComponent],
  declarations: [
      AddCharacterPage,
      ClassDialogComponent],
  exports: [AddCharacterPage],
})
export class AddCharacterPageModule {}
