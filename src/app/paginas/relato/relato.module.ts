import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatoPageRoutingModule } from './relato-routing.module';

import { RelatoPage } from './relato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatoPageRoutingModule
  ],
  declarations: [RelatoPage]
})
export class RelatoPageModule {}
