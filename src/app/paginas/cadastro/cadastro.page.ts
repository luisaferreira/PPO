import { Component, OnInit, ɵɵsanitizeUrlOrResourceUrl } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoadingController, ToastController, PickerController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { __await } from 'tslib';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: Usuario = {};
  private loading: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public router: Router
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
            
      this.afAuth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha);

      var user = this.afAuth.auth.currentUser
      user.updateProfile({
        displayName: this.usuario.nome
      })

      console.log(user);
      

      this.router.navigate(['/tabs/home']);
      
    } catch (error) {
      this.presentToast(error.message);
      console.log(error);
    } finally {
      this.loading.dismiss();
      console.log(this.usuario.nome);
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