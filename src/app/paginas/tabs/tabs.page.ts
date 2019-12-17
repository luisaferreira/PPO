import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit{
   @ViewChild('tabs', {static: true}) tabs: IonTabs

  // private usuarios: new Array<Usuario>();

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.tabs.select('/home')
  }
}
