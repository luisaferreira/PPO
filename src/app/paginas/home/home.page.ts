import { Component, OnInit } from '@angular/core';
import { Relato } from 'src/app/interfaces/relato';
import { RelatosService } from 'src/app/services/relatos.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private relatos = new Array<Relato>();
  private relatosSubscription: Subscription;
  private relatoId: string = null;
  private loading: any;
  private usuarioID: string = this.afAuth.auth.currentUser.uid;

  constructor(
    private relatosService: RelatosService,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.relatosSubscription = this.relatosService.getRelatos().subscribe(data => {
      this.relatos = data.filter(rel => rel.resolvido === false );
    });
  }

  ngOnInit() {
    this.relatosSubscription = this.relatosService.getRelatos().subscribe(data => {
      this.relatos = data.filter(rel => rel.resolvido === false ).sort((a,b) => a.createdAt > b.createdAt ? -1 : 1);
    });
  }

  ngOnDestroy() {
    this.relatosSubscription.unsubscribe();
  }

  async deleteRelato(id: string) {
    await this.presentLoading();

    try {
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
