import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

  private loading: any;

  constructor(
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.afAuth.auth.signOut();

      this.router.navigate(['/login'])
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
      header: "oops",
      message: message,
      duration: 2000
    });
    return toast.present();
  }
}
