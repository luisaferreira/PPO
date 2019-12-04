import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/interfaces/usuario'
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-senha',
  templateUrl: './new-senha.page.html',
  styleUrls: ['./new-senha.page.scss'],
})
export class NewSenhaPage implements OnInit {

  public usuario: Usuario = {};
  private loading: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async atualizarSenha() {
    await this.presentLoading();

    if (this.usuario.senha != this.usuario.confsenha) {
      this.presentToast("The passwords doesn't match.");
      console.error("as senhas não são iguais");
    }

    try {
      await this.afAuth.auth.currentUser.updatePassword(this.usuario.senha);

      this.router.navigate(['/configuracoes'])
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
