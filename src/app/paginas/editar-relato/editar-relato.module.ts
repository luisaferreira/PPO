import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarRelatoPageRoutingModule } from './editar-relato-routing.module';

import { EditarRelatoPage } from './editar-relato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarRelatoPageRoutingModule
  ],
  declarations: [EditarRelatoPage]
})
export class EditarRelatoPageModule {}
