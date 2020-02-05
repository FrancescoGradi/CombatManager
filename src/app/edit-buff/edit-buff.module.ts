import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBuffPageRoutingModule } from './edit-buff-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {EditBuffPage} from './edit-buff.page';
import {MatSidenavModule} from '@angular/material';
import {DoubleCheckBuffDialogComponent} from '../double-check-buff-dialog/double-check-buff-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditBuffPageRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MatDialogModule,
        MatSidenavModule,
    ],
    entryComponents: [
        DoubleCheckBuffDialogComponent,
    ],
    declarations: [
      EditBuffPage,
      DoubleCheckBuffDialogComponent,
    ],
    exports: [ EditBuffPage ],
})
export class EditBuffPageModule {}
