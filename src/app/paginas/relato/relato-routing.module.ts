import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatoPage } from './relato.page';

const routes: Routes = [
  {
    path: '',
    component: RelatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatoPageRoutingModule {}
