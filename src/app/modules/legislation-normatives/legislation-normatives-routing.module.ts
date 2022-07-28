import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegislationNormativesPage } from './legislation-normatives.page';

const routes: Routes = [
  {
    path: '',
    component: LegislationNormativesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegislationNormativesPageRoutingModule {}
