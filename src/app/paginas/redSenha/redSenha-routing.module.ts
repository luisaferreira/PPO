import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { redSenhaPage } from './redSenha.page';

const routes: Routes = [
  {
    path: '',
    component: redSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class redSenhaPageRoutingModule {}
