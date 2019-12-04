import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedemailPageRoutingModule } from './redemail-routing.module';

import { RedemailPage } from './redemail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedemailPageRoutingModule
  ],
  declarations: [RedemailPage]
})
export class RedemailPageModule {}
