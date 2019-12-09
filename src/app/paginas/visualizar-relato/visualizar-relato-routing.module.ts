import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarRelatoPage } from './visualizar-relato.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarRelatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarRelatoPageRoutingModule {}
