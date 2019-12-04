import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSenhaPage } from './new-senha.page';

const routes: Routes = [
  {
    path: '',
    component: NewSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSenhaPageRoutingModule {}
