import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild(IonSlides, {static: true}) slides: IonSlides
  private usuario: Usuario = {};

  constructor( ) { }

  ngOnInit() { }

  segmentChanged(event: any) {
    if (event.detail.value === 'pendentes') {
      this.slides.slidePrev();
    } else if (event.detail.value === 'resolvidos') {
      this.slides.slideNext();
    }
  }
}
