import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { IonSlides } from '@ionic/angular';
import { Relato } from 'src/app/interfaces/relato';
import { Subscription } from 'rxjs';
import { RelatosService } from 'src/app/services/relatos.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides

  private relatosPendentes = new Array<Relato>();
  private relatosResolvidos = new Array<Relato>();
  private relatosSubscriptionP: Subscription;
  private relatosSubscriptionR: Subscription;
  private usuarioId = this.afAuth.auth.currentUser.uid;
  private usuarios = new Array<Usuario>();
  private usuario: Usuario = {}

  constructor(
    private relatosService: RelatosService,
    private afAuth: AngularFireAuth,
  ) {
    //recebendo lista de relatos pendentes
    this.relatosSubscriptionP = this.relatosService.getRelatos().subscribe(data => {
      this.relatosPendentes = data.filter(rel => rel.resolvido === false && rel.userId === this.usuarioId).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    });
    //recebendo lista de relatos resolvidos
    this.relatosSubscriptionR = this.relatosService.getRelatos().subscribe(data => {
      this.relatosResolvidos = data.filter(rel => rel.resolvido === true && rel.userId === this.usuarioId).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    });

  }

  ngOnInit() {
    this.displayInfo();

  }

  ngOnDestroy() {
    this.relatosSubscriptionP.unsubscribe();
    this.relatosSubscriptionR.unsubscribe();
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'pendentes') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  displayInfo() {
    const emailUser = document.querySelector('.email_user')
    const nomeUser = document.querySelector('.nome_user')

    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        const html1 = ` <h2> ${user.displayName} </h2> `
        const html = ` <p> ${user.email} </p> `;
        emailUser.innerHTML = html;
        nomeUser.innerHTML = html1;
        console.log(user);

      } else {
        emailUser.innerHTML = '';
        nomeUser.innerHTML = ' ';
        console.log(user);

      }
    })
  }
}

