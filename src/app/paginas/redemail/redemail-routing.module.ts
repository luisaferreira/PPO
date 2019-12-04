import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedemailPage } from './redemail.page';

const routes: Routes = [
  {
    path: '',
    component: RedemailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedemailPageRoutingModule {}
