import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { AddBuffPage } from '../add-buff/add-buff.page';
import { EditBuffPage } from '../edit-buff/edit-buff.page';
import { AddCharacterPage} from '../add-character/add-character.page';
import { EditCharacterPage } from '../edit-character/edit-character.page';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule, MatStepperModule, MatTableModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {HomePageRoutingModule} from "./home-routing.module";
import {AddBuffPageModule} from "../add-buff/add-buff.module";
import {EditBuffPageModule} from "../edit-buff/edit-buff.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        MatTabsModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatSelectModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatTableModule,
        AddBuffPageModule,
        EditBuffPageModule,
    ],
  declarations: [HomePage, AddCharacterPage, EditCharacterPage]
})

export class HomePageModule { }
