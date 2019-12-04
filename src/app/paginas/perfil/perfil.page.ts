import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private usuario: Usuario = {};

  constructor( ) { }

  ngOnInit() { }
}
