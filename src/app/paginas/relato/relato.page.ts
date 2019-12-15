import { Component, OnInit } from '@angular/core';
import { Relato } from 'src/app/interfaces/relato';
import { AngularFireAuth } from '@angular/fire/auth';
import { RelatosService } from 'src/app/services/relatos.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  private data: any;

  constructor(
    private afAuth: AngularFireAuth,
    private relatosService: RelatosService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.infoLocal;
      }
    });

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

  async addRelato(relato) {
    await this.presentLoading();

    this.relato.createdAt = new Date().getTime();
    this.relato.endereco = this.data.endereco;
    this.relato.numLike = 0;
    this.relato.latLng = this.data.latLng;
    this.relato.resolvido = false;
    this.relato.userId = this.afAuth.auth.currentUser.uid;
    this.relato.usersLike = [];

    try {
      await this.relatosService.addRelato(this.relato);
      this.router.navigate(['tabs/home']);
    } catch (error) {
      console.log(error);
      this.presentToast("Erro ao registrar denúncia!")
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
