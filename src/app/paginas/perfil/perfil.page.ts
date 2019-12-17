import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { IonSlides } from '@ionic/angular';
import { Relato } from 'src/app/interfaces/relato';
import { Subscription } from 'rxjs';
import { RelatosService } from 'src/app/services/relatos.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  private usuariosSubscription: Subscription;

  constructor(
    private relatosService: RelatosService,
    private afAuth: AngularFireAuth,
    private usuarioService: UsuarioService
  ) {
    //recebendo lista de relatos pendentes
    this.relatosSubscriptionP = this.relatosService.getRelatos().subscribe(data => {
      this.relatosPendentes = data.filter(rel => rel.resolvido === false && rel.userId === this.usuarioId).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    });
    //recebendo lista de relatos resolvidos
    this.relatosSubscriptionR = this.relatosService.getRelatos().subscribe(data => {
      this.relatosResolvidos = data.filter(rel => rel.resolvido === true && rel.userId === this.usuarioId).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    });

    //recebendo dados do usuário
    this.usuariosSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  }

  ngOnInit() {
    this.updateID();
    this.displayEmail();
    this.displayNome();
  }

  ngOnDestroy() {
    this.relatosSubscriptionP.unsubscribe();
    this.relatosSubscriptionR.unsubscribe();
    this.usuariosSubscription.unsubscribe();
  }

  updateID() {

    try {
      this.usuario.id = this.usuarioId;
      this.usuarioService.updateUsuario(this.usuarioId, this.usuario);
    } catch (error) {
      console.log(error);
    }
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'pendentes') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
      console.log(this.usuarios[1].nome);
      console.log(this.usuarios[2].nome);
      // console.log(this.usuarios[3].nome);

    }
  }

  displayEmail() {
    const emailUser = document.querySelector('.email_user')

    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        const html = ` <p> ${user.email} </p> `;
        emailUser.innerHTML = html;
      } else {
        emailUser.innerHTML = '';

      }
    })

  }

  displayNome() {
    const nomeUser = document.querySelector('.nome_user')
    const nome: string = "grr"

    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id == this.usuarioId) {

        const html = ` <h2> ${nome} </h2> `;
        nomeUser.innerHTML = html;
      } else {
        nomeUser.innerHTML = '';
      }
    }
  }

}
