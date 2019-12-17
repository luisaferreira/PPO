import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoadingController, ToastController, PickerController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { PickerOptions } from '@ionic/core';
import { __await } from 'tslib';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: Usuario = {};
  private loading: any;
  private user = this.afAuth.auth.currentUser;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public router: Router,
    private pickerCtrl: PickerController,
  ) { }

  ngOnInit() {
  }

  async cadastrar() {
    await this.presentLoading();

    if (this.usuario.senha != this.usuario.confsenha) {
      this.presentToast("the passwords doesn't match")
      return console.error("As senhas não são iguais");
    }
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha);
      this.router.navigate(['/tabs']);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });

    return this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  
}