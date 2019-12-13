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
  private estado = '';
  private year: number = new Date().getFullYear();

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

    var age = this.year - this.usuario.anoNasc;

     if (age < 16) {
       this.presentToast("Menor de 16");
       return console.error("menor de 16");
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

  async presentPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done'
        }
      ],
      columns: [
        {
          name: 'usuario.estado',
          options: [
            { text: 'Acre', value: 'Acre' },
            { text: 'Alagoas', value: 'Alagoas' },
            { text: 'Amapá', value: 'Amapá' },
            { text: 'Amazonas', value: 'Amazonas' },
            { text: 'Bahia', value: 'Bahia' },
            { text: 'Ceará', value: 'Ceará' },
            { text: 'Distrito Federal', value: 'Distrito Federal' },
            { text: 'Goiás', value: 'Goiás' },
            { text: 'Maranhão', value: 'Maranhão' },
            { text: 'Mato Grosso', value: 'Mato Grosso' },
            { text: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul' },
            { text: 'Minas Gerais', value: 'Minas Gerais' },
            { text: 'Pará', value: 'Pará' },
            { text: 'Paraíba', value: 'Paraíba' },
            { text: 'Paraná', value: 'Paraná' },
            { text: 'Pernambuco', value: 'Pernambuco' },
            { text: 'Piauí', value: 'Piauí' },
            { text: 'Rio de Janeiro', value: 'Rio de Janeiro' },
            { text: 'Rio Grande do Norte', value: 'Rio Grande do Norte' },
            { text: 'Rio Grande do Sul', value: 'Rio Grande do Sul' },
            { text: 'Rondônia', value: 'Rondônia' },
            { text: 'Roraima', value: 'Roraima' },
            { text: 'Santa Catarina', value: 'Santa Catarina' },
            { text: 'São Paulo', value: 'São Paulo' },
            { text: 'Sergipe', value: 'Sergipe' },
            { text: 'Tocantins', value: 'Tocantins' },
          ]
        }
      ]
    };
    const picker = await this.pickerCtrl.create(options);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('usuario.estado');
      console.log('col: ', col);
      this.estado = col.options[col.selectedIndex].text;

    })
  }
}