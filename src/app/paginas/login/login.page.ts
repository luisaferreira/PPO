import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: Usuario = {};
  private loading: any;

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async login(usuario: Usuario){
    await this.presentLoading();

    try{
      await this.afAuth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha);
      this.router.navigate(['/tabs/home']);
    }catch(error){
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

   async presentToast(msg: string) {
     const toast = await this.toastCtrl.create({
       message: msg,
       duration: 2000
     });

     toast.present();
   }

}
