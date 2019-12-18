import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { RelatosService } from 'src/app/services/relatos.service';
import { Relato } from 'src/app/interfaces/relato';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-excluir-conta',
  templateUrl: './excluir-conta.page.html',
  styleUrls: ['./excluir-conta.page.scss'],
})
export class ExcluirContaPage implements OnInit {

  private usuario: Usuario = {}
  private loading: any;
  private relatos = new Array<Relato>();
  private relatosSubscription: Subscription;
  private relatoID: string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private relatosService: RelatosService
  ) {
    this.relatosSubscription = this.relatosService.getRelatos().subscribe(data => {
      this.relatos = data;
    })
   }

  ngOnInit() { }

  ngOnDestroy() {
    this.relatosSubscription.unsubscribe();
  }

  async excluirRelatos() {
    const userUid = this.afAuth.auth.currentUser.uid;

    for (let i = 0; i < this.relatos.length; i++) {
      if (this.relatos[i].userId == userUid) {
        this.relatoID = this.relatos[i].id
        try {
          this.relatosService.deleteRelato(this.relatoID);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  async excluirConta() {
    await this.presentLoading();

    try {
      await this.excluirRelatos();
      await this.afAuth.auth.currentUser.delete();

      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Por favor, aguarde..."
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
