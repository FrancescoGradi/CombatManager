import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AddBuffPage } from '../add-buff/add-buff.page';
import { EditBuffPage } from '../edit-buff/edit-buff.page';
import { AddCharacterPage} from '../add-character/add-character.page';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSidenavModule, MatStepperModule} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            },
            {
                path: 'add-buff',
                component: AddBuffPage
            },
            {
                path: 'edit-buff',
                component: EditBuffPage
            },
            {
                path: 'add-character',
                component: AddCharacterPage
            }
        ]),
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
    ],
  declarations: [HomePage, AddBuffPage, AddCharacterPage, EditBuffPage]
})
export class HomePageModule {}
