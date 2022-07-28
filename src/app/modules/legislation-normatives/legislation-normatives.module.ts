import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegislationNormativesPageRoutingModule } from './legislation-normatives-routing.module';

import { LegislationNormativesPage } from './legislation-normatives.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegislationNormativesPageRoutingModule,
    SharedModule
  ],
  declarations: [LegislationNormativesPage]
})
export class LegislationNormativesPageModule {}
