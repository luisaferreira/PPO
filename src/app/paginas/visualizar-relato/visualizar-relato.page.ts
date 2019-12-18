import { Component, OnInit } from '@angular/core';
import { RelatosService } from 'src/app/services/relatos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Relato } from 'src/app/interfaces/relato';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-visualizar-relato',
  templateUrl: './visualizar-relato.page.html',
  styleUrls: ['./visualizar-relato.page.scss'],
})
export class VisualizarRelatoPage implements OnInit {

  private relato: Relato = {};
  private relatoId: string = null;
  private relatoSubscription: Subscription;
  private usuarioId = this.afAuth.auth.currentUser.uid

  constructor(
    private afAuth: AngularFireAuth,
    private relatosService: RelatosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.inicializar(params['id']);
      })
  }

  ngOnDestroy() {
    if (this.relatoSubscription) this.relatoSubscription.unsubscribe();
  }

  inicializar(id: string) {
    this.relatoId = id;

    if(this.relatoId) this.loadRelato();
  }

  loadRelato() {
    this.relatoSubscription = this.relatosService.getRelato(this.relatoId).subscribe(data => {
      this.relato = data;
    });
  }

  async like() {
    const userVer = this.relato.usersLike.includes(this.afAuth.auth.currentUser.uid);

    try {
      if (userVer === false){
        this.relato.numLike ++;
        this.relato.usersLike.push(this.afAuth.auth.currentUser.uid);
        await this.relatosService.updateRelato(this.relatoId, this.relato)
      } else if (userVer === true){
        this.relato.numLike --;

        const index = this.relato.usersLike.indexOf(this.afAuth.auth.currentUser.uid);
        this.relato.usersLike.splice(index, 1);

        await this.relatosService.updateRelato(this.relatoId, this.relato)
      }
    } catch (error) {
      console.log(error);  
    }
  }


}
