import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBuffPageRoutingModule } from './add-buff-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {AddBuffPage} from './add-buff.page';
import {MatDividerModule, MatSidenavModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddBuffPageRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatDividerModule,
    ],
  declarations: [ AddBuffPage ],
  exports: [ AddBuffPage ],
})
export class AddBuffPageModule {}
