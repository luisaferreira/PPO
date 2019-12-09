import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarRelatoPage } from './editar-relato.page';

const routes: Routes = [
  {
    path: '',
    component: EditarRelatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarRelatoPageRoutingModule {}
