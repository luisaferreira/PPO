import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatosPage } from './relatos.page';

const routes: Routes = [
  {
    path: '',
    component: RelatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatosPageRoutingModule {}
