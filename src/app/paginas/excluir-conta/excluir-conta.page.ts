import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-excluir-conta',
  templateUrl: './excluir-conta.page.html',
  styleUrls: ['./excluir-conta.page.scss'],
})
export class ExcluirContaPage implements OnInit {

  private usuario: Usuario = {}
  private loading: any;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async excluirConta() {
    await this.presentLoading();

    try {
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
