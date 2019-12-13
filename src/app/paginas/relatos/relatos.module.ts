import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatosPageRoutingModule } from './relatos-routing.module';

import { RelatosPage } from './relatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatosPageRoutingModule
  ],
  declarations: [RelatosPage]
})
export class RelatosPageModule {}
