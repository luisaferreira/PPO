import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSenhaPageRoutingModule } from './new-senha-routing.module';

import { NewSenhaPage } from './new-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSenhaPageRoutingModule
  ],
  declarations: [NewSenhaPage]
})
export class NewSenhaPageModule {}
