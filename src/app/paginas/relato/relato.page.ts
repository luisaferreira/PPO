import { Component, OnInit } from '@angular/core';
import { Relato } from 'src/app/interfaces/relato';
import { AngularFireAuth } from '@angular/fire/auth';
import { RelatosService } from 'src/app/services/relatos.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-relato',
  templateUrl: './relato.page.html',
  styleUrls: ['./relato.page.scss'],
})
export class RelatoPage implements OnInit {

  private relato: Relato = {}
  private loading: any;
  private relatoId: string = null;
  private relatoSubscription: Subscription;
  private relatosCollection: AngularFirestoreCollection<Relato>;

  constructor(
    private afAuth: AngularFireAuth,
    private relatosService: RelatosService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.relatoId = this.activatedRoute.snapshot.params['id'];

    if (this.relatoId) this.loadRelato();
  }

  ngOnInit() {
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

    this.relato.userId = this.afAuth.auth.currentUser.uid;

    if (this.relatoId) {

      try {
        await this.relatosService.updateRelato(this.relatoId, this.relato);
        await this.loading.dismiss();
      } catch (error) {
        console.log(error);
        this.presentToast("Erro ao atualizar produto!");
        this.loading.dismiss();
      }
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
