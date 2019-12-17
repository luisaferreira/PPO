import { Component, OnInit } from '@angular/core';
import { Relato } from 'src/app/interfaces/relato';
import { AngularFireAuth } from '@angular/fire/auth';
import { RelatosService } from 'src/app/services/relatos.service';
import { NavController, LoadingController, ToastController, IonAvatar } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-relato',
  templateUrl: './editar-relato.page.html',
  styleUrls: ['./editar-relato.page.scss'],
})
export class EditarRelatoPage implements OnInit {

  private relato: Relato = {};
  private relatoId: string = null;
  private relatoSubscription: Subscription
  private loading: any;
  private usuarioId: string = this.afAuth.auth.currentUser.uid;

  constructor(
    private afAuth: AngularFireAuth,
    private relatosService: RelatosService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.inicializar(params['id']);
      })
  }

  inicializar(id: string) {
    // console.log('inicializado: ' + id);
    this.relatoId = id;

    if (this.relatoId) this.loadRelato();
  }

  ngOnDestroy() {
    if (this.relatoSubscription) this.relatoSubscription.unsubscribe();
  }

  loadRelato() {
    this.relatoSubscription = this.relatosService.getRelato(this.relatoId).subscribe(data => {
      this.relato = data;
    });
  }

  async updateRelato() {
    await this.presentLoading();

    try {
      await this.relatosService.updateRelato(this.relatoId, this.relato);
      this.navCtrl.navigateBack('/tabs/home');
      console.log(this.relatoId);
      
    } catch (error) {
      this.presentToast("Erro ao atualizar o relato");
    } finally {
      this.loading.dismiss();
    }
  }

  async deleteRelato(id: string) {
    await this.presentLoading();

    try {
      await this.relatosService.deleteRelato(this.relatoId);
    } catch (error) {
      this.presentToast("Erro ao excluir o relato")
    } finally {
      this.loading.dismiss();
    }
  }

  async like() {
    const userVer = this.relato.usersLike.includes(this.afAuth.auth.currentUser.uid);

    try {
      if (userVer === false){
        this.relato.numLike ++;
        this.relato.usersLike.push(this.afAuth.auth.currentUser.uid);
        await this.relatosService.updateRelato(this.relatoId, this.relato)
      } else if (userVer === true){
        this.relato.numLike --;

        const index = this.relato.usersLike.indexOf(this.afAuth.auth.currentUser.uid);
        this.relato.usersLike.splice(index, 1);

        await this.relatosService.updateRelato(this.relatoId, this.relato)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

    ifOwner(ver: boolean) {
      if (this.relato.userId === this.usuarioId) {
        return true;
        console.log("caso true" + this.relato.userId);
      } else if (this.relato.userId != this.usuarioId) {
        return false;
        console.log(this.relato.userId);
      }
    }

    ifNotOwner(ver: boolean) {
      if (this.relato.userId === this.usuarioId) {
        return false;
        console.log("caso false" + this.relato.userId);
      } else if (this.relato.userId != this.usuarioId) {
        return true;
        console.log(this.relato.userId);
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