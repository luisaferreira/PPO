import { Component, OnInit } from '@angular/core';
import { Relato } from 'src/app/interfaces/relato';
import { AngularFireAuth } from '@angular/fire/auth';
import { RelatosService } from 'src/app/services/relatos.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-relato',
  templateUrl: './editar-relato.page.html',
  styleUrls: ['./editar-relato.page.scss'],
})
export class EditarRelatoPage implements OnInit {

  private relato: Relato = {};
  private relatoId: string = null;
  private relatoSubscription: Subscription
  private loading: any;
  private usuarioId: string = this.afAuth.auth.currentUser.uid

  constructor(
    private afAuth: AngularFireAuth,
    private relatosService: RelatosService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    
  }

  ngOnInit() {
    this.activatedRoute.params 
      .subscribe(params => {
        this.inicializar(params['id']);
      })
   }

   inicializar(id: string) {
    console.log('inicializado: ' + id);
    this.relatoId = id;

    if (this.relatoId) this.loadRelato();
   }

  ngOnDestroy() {
    if (this.relatoSubscription) this.relatoSubscription.unsubscribe();
  }

  loadRelato() {
    this.relatoSubscription = this.relatosService.getRelato(this.relatoId).subscribe(data => {
      this.relato = data;
    });
  }

  async updateRelato() {
    await this.presentLoading();

    try {
      await this.relatosService.updateRelato(this.relatoId, this.relato);
      this.navCtrl.navigateBack('/tabs/home');
    } catch (error) {
      this.presentToast("Erro ao atualizar o relato");
    } finally {
      this.loading.dismiss();
    }
  }

  async deleteRelato(id: string) {
    await this.presentLoading();

    try{
      await this.relatosService.deleteRelato(this.relatoId);
    } catch (error) {
      this.presentToast("Erro ao excluir o relato")
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Aguarde, por favor..."
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    return toast.present();
  }
}