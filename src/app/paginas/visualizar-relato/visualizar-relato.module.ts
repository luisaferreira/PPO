import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarRelatoPageRoutingModule } from './visualizar-relato-routing.module';

import { VisualizarRelatoPage } from './visualizar-relato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarRelatoPageRoutingModule
  ],
  declarations: [VisualizarRelatoPage]
})
export class VisualizarRelatoPageModule {}
