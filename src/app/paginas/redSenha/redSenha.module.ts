import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { redSenhaPageRoutingModule } from './redSenha-routing.module';

import { redSenhaPage } from './redSenha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    redSenhaPageRoutingModule
  ],
  declarations: [redSenhaPage]
})
export class redSenhaPageModule {}
