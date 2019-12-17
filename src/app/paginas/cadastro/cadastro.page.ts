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

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public router: Router,
    private pickerCtrl: PickerController
  ) { }

  ngOnInit() {
  }

  async cadastrar() {
    await this.presentLoading();

    if (this.usuario.senha != this.usuario.confsenha) {
      this.presentToast("The passwords doesn't match!");
      return console.error("As senhas não são iguais");
    }

    try {
      const nvUsuario = await this.afAuth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha);
      //um "filtro" para os dados que seram enviados ao banco
      const nvUsuarioObject = Object.assign({}, this.usuario)

      delete nvUsuarioObject.senha; //insenta a senha de ser enviada ao banco 
      delete nvUsuarioObject.confsenha; //insenta a confirmação de senha de ser enviada ao banco 

      await this.afStore.collection('Usuários').doc(nvUsuario.user.uid).set(nvUsuarioObject) //envia para o banco todos os dados ao invés de apenas e-mail e senha
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